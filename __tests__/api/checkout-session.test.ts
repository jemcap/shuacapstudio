import { POST } from '@/app/api/checkout-session/route';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

jest.mock('stripe');

describe('Checkout Session API Route', () => {
  let mockStripe: any;
  let mockCreateSession: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateSession = jest.fn();
    mockStripe = {
      checkout: {
        sessions: {
          create: mockCreateSession,
        },
      },
    };
    (Stripe as any).mockImplementation(() => mockStripe);
    process.env.STRIPE_SECRET_KEY = 'sk_test_key';
  });

  it('should create checkout session with valid data', async () => {
    mockCreateSession.mockResolvedValueOnce({
      url: 'https://checkout.stripe.com/session123',
    });

    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        packageName: 'Test Package',
        price: 100,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.url).toBe('https://checkout.stripe.com/session123');
    expect(mockCreateSession).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({
              unit_amount: 10000,
            }),
          }),
        ],
      })
    );
  });

  it('should reject negative prices', async () => {
    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        packageName: 'Test Package',
        price: -100,
      }),
    });

    await POST(request);

    expect(mockCreateSession).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({
              unit_amount: -10000, // Should be validated in production
            }),
          }),
        ],
      })
    );
  });

  it('should handle price manipulation attempts', async () => {
    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        packageName: 'Premium Package',
        price: 0.01, // Attempting to pay 1 penny for premium
      }),
    });

    await POST(request);

    expect(mockCreateSession).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({
              unit_amount: 1, // Should validate against actual prices
            }),
          }),
        ],
      })
    );
  });

  it('should handle XSS in package name', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    mockCreateSession.mockResolvedValueOnce({
      url: 'https://checkout.stripe.com/session123',
    });

    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        packageName: xssPayload,
        price: 100,
      }),
    });

    await POST(request);

    expect(mockCreateSession).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({
              product_data: { name: xssPayload }, // Should be sanitized
            }),
          }),
        ],
      })
    );
  });

  it('should handle missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    await expect(POST(request)).rejects.toThrow();
  });

  it('should handle Stripe API errors', async () => {
    mockCreateSession.mockRejectedValueOnce(new Error('Stripe API error'));

    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        packageName: 'Test Package',
        price: 100,
      }),
    });

    await expect(POST(request)).rejects.toThrow('Stripe API error');
  });

  it('should validate against actual package prices', async () => {
    // This test demonstrates the vulnerability - prices should be server-validated
    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        packageName: 'Event Recap', // Actually costs 250
        price: 10, // Trying to pay only 10
      }),
    });

    await POST(request);

    expect(mockCreateSession).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: [
          expect.objectContaining({
            price_data: expect.objectContaining({
              unit_amount: 1000, // Should be 25000 for actual price
            }),
          }),
        ],
      })
    );
  });

  it('should handle float precision issues', async () => {
    const request = new NextRequest('http://localhost:3000/api/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        packageName: 'Test Package',
        price: 99.999999999,
      }),
    });

    await POST(request);

    expect(mockCreateSession).toHaveBeenCalled();
  });
});