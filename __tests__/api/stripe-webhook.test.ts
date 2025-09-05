import { POST } from '@/app/api/stripe-webhook/route';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { sendConfirmationEmail } from '@/lib/sendConfirmation';

jest.mock('stripe');
jest.mock('@/lib/sendConfirmation');

describe('Stripe Webhook API Route', () => {
  let mockStripe: any;
  let mockConstructEvent: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConstructEvent = jest.fn();
    mockStripe = {
      webhooks: {
        constructEvent: mockConstructEvent,
      },
    };
    (Stripe as any).mockImplementation(() => mockStripe);
    process.env.STRIPE_SECRET_KEY = 'sk_test_key';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret';
  });

  it('should process charge.succeeded event', async () => {
    const mockEvent = {
      type: 'charge.succeeded',
      data: {
        object: {
          billing_details: {
            email: 'customer@example.com',
          },
        },
      },
    };

    mockConstructEvent.mockReturnValueOnce(mockEvent);
    (sendConfirmationEmail as jest.Mock).mockResolvedValueOnce(undefined);

    const request = new NextRequest('http://localhost:3000/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'valid_signature',
      },
      body: 'raw_body',
    });

    const response = await POST(request);
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(text).toBe('ok');
    expect(sendConfirmationEmail).toHaveBeenCalledWith(
      'customer@example.com',
      'https://docs.google.com/forms/d/1on9IUzlGnwpYg8OzhfH-dBqulo_k2AE6zGMzSJg7rvY/edit'
    );
  });

  it('should handle missing signature header', async () => {
    const request = new NextRequest('http://localhost:3000/api/stripe-webhook', {
      method: 'POST',
      body: 'raw_body',
    });

    await expect(POST(request)).rejects.toThrow();
  });

  it('should handle invalid signature', async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error('Invalid signature');
    });

    const request = new NextRequest('http://localhost:3000/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'invalid_signature',
      },
      body: 'raw_body',
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.text()).toBe('Webhook Error');
  });

  it('should handle events without email', async () => {
    const mockEvent = {
      type: 'charge.succeeded',
      data: {
        object: {
          billing_details: {},
        },
      },
    };

    mockConstructEvent.mockReturnValueOnce(mockEvent);

    const request = new NextRequest('http://localhost:3000/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'valid_signature',
      },
      body: 'raw_body',
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(sendConfirmationEmail).not.toHaveBeenCalled();
  });

  it('should ignore other event types', async () => {
    const mockEvent = {
      type: 'payment_intent.created',
      data: {
        object: {},
      },
    };

    mockConstructEvent.mockReturnValueOnce(mockEvent);

    const request = new NextRequest('http://localhost:3000/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'valid_signature',
      },
      body: 'raw_body',
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(sendConfirmationEmail).not.toHaveBeenCalled();
  });

  it('should handle email sending errors gracefully', async () => {
    const mockEvent = {
      type: 'charge.succeeded',
      data: {
        object: {
          billing_details: {
            email: 'customer@example.com',
          },
        },
      },
    };

    mockConstructEvent.mockReturnValueOnce(mockEvent);
    (sendConfirmationEmail as jest.Mock).mockRejectedValueOnce(new Error('Email error'));

    const request = new NextRequest('http://localhost:3000/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'valid_signature',
      },
      body: 'raw_body',
    });

    await expect(POST(request)).rejects.toThrow('Email error');
  });

  it('should prevent replay attacks', async () => {
    // Stripe SDK handles this internally, but we should test the behavior
    const oldTimestamp = Math.floor(Date.now() / 1000) - 400; // 400 seconds ago
    
    mockConstructEvent.mockImplementation(() => {
      throw new Error('Timestamp outside tolerance zone');
    });

    const request = new NextRequest('http://localhost:3000/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': `t=${oldTimestamp},v1=signature`,
      },
      body: 'raw_body',
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it('should handle malformed event data', async () => {
    const mockEvent = {
      type: 'charge.succeeded',
      data: null,
    };

    mockConstructEvent.mockReturnValueOnce(mockEvent);

    const request = new NextRequest('http://localhost:3000/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'stripe-signature': 'valid_signature',
      },
      body: 'raw_body',
    });

    await expect(POST(request)).rejects.toThrow();
  });
});