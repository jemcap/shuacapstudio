import { NextRequest } from 'next/server';
import { withRateLimit, contactRateLimiter } from '@/lib/rate-limiter';

// Mock NextRequest
const createMockRequest = (ip = '127.0.0.1') => {
  const headers = new Headers();
  headers.set('x-forwarded-for', ip);
  
  return new NextRequest('http://localhost:3000/api/test', {
    method: 'POST',
    headers
  });
};

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Clear the rate limiter store
    (contactRateLimiter as any).store = {};
  });

  it('should allow requests within limit', async () => {
    const req = createMockRequest();
    let callCount = 0;
    
    const handler = async () => {
      callCount++;
      return new Response('OK');
    };

    // Should allow 5 requests
    for (let i = 0; i < 5; i++) {
      const response = await withRateLimit(req, contactRateLimiter, handler);
      expect(response.status).toBe(200);
      expect(callCount).toBe(i + 1);
    }
  });

  it('should block requests over limit', async () => {
    const req = createMockRequest();
    let callCount = 0;
    
    const handler = async () => {
      callCount++;
      return new Response('OK');
    };

    // First 5 requests should pass
    for (let i = 0; i < 5; i++) {
      await withRateLimit(req, contactRateLimiter, handler);
    }

    // 6th request should be blocked
    const response = await withRateLimit(req, contactRateLimiter, handler);
    expect(response.status).toBe(429);
    expect(callCount).toBe(5); // Handler should not be called

    const body = await response.json();
    expect(body.error).toContain('Too many requests');
  });

  it('should track different IPs separately', async () => {
    const req1 = createMockRequest('192.168.1.1');
    const req2 = createMockRequest('192.168.1.2');
    let callCount = 0;
    
    const handler = async () => {
      callCount++;
      return new Response('OK');
    };

    // Use up limit for first IP
    for (let i = 0; i < 5; i++) {
      await withRateLimit(req1, contactRateLimiter, handler);
    }

    // Second IP should still be able to make requests
    const response = await withRateLimit(req2, contactRateLimiter, handler);
    expect(response.status).toBe(200);
    expect(callCount).toBe(6);
  });

  it('should reset after time window', async () => {
    // Create a fast rate limiter for testing
    const testLimiter = new (contactRateLimiter.constructor as any)({
      windowMs: 100, // 100ms window
      maxRequests: 2
    });

    const req = createMockRequest();
    let callCount = 0;
    
    const handler = async () => {
      callCount++;
      return new Response('OK');
    };

    // Use up limit
    await withRateLimit(req, testLimiter, handler);
    await withRateLimit(req, testLimiter, handler);
    
    // Should be blocked
    let response = await withRateLimit(req, testLimiter, handler);
    expect(response.status).toBe(429);
    expect(callCount).toBe(2);

    // Wait for window to reset
    await new Promise(resolve => setTimeout(resolve, 150));

    // Should be allowed again
    response = await withRateLimit(req, testLimiter, handler);
    expect(response.status).toBe(200);
    expect(callCount).toBe(3);
  });

  it('should handle missing x-forwarded-for header', async () => {
    const req = new NextRequest('http://localhost:3000/api/test', {
      method: 'POST'
    });
    
    const handler = async () => new Response('OK');
    
    const response = await withRateLimit(req, contactRateLimiter, handler);
    expect(response.status).toBe(200);
  });

  it('should include proper headers in rate limit response', async () => {
    const req = createMockRequest();
    const handler = async () => new Response('OK');

    // Use up limit
    for (let i = 0; i < 5; i++) {
      await withRateLimit(req, contactRateLimiter, handler);
    }

    const response = await withRateLimit(req, contactRateLimiter, handler);
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('900');
    expect(response.headers.get('X-RateLimit-Limit')).toBe('5');
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0');
  });
});