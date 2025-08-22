import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(options: { windowMs: number; maxRequests: number }) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
  }

  private cleanup() {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }

  private getClientIdentifier(req: NextRequest): string {
    // Use IP address as identifier
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    return ip;
  }

  async checkLimit(req: NextRequest): Promise<boolean> {
    this.cleanup();
    
    const clientId = this.getClientIdentifier(req);
    const now = Date.now();
    
    if (!this.store[clientId]) {
      this.store[clientId] = {
        count: 1,
        resetTime: now + this.windowMs
      };
      return true;
    }
    
    if (this.store[clientId].resetTime < now) {
      this.store[clientId] = {
        count: 1,
        resetTime: now + this.windowMs
      };
      return true;
    }
    
    if (this.store[clientId].count >= this.maxRequests) {
      return false;
    }
    
    this.store[clientId].count++;
    return true;
  }
}

// Create rate limiters for different endpoints
export const contactRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // 5 requests per window
});

export const chatbotRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20 // 20 requests per minute
});

export const checkoutRateLimiter = new RateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 10 // 10 checkout attempts per window
});

// Rate limiting middleware
export async function withRateLimit(
  req: NextRequest,
  rateLimiter: RateLimiter,
  handler: () => Promise<Response>
): Promise<Response> {
  const allowed = await rateLimiter.checkLimit(req);
  
  if (!allowed) {
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        retryAfter: '15 minutes'
      },
      { 
        status: 429,
        headers: {
          'Retry-After': '900', // 15 minutes in seconds
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0'
        }
      }
    );
  }
  
  return handler();
}