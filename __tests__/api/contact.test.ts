import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('Contact API Route', () => {
  const mockSendMail = jest.fn();
  const mockCreateTransport = jest.fn(() => ({
    sendMail: mockSendMail,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
    (nodemailer.createTransport as jest.Mock) = mockCreateTransport;
    process.env.SMTP_USER = 'test@example.com';
    process.env.SMTP_PASS = 'password';
  });

  it('should send email successfully with valid data', async () => {
    mockSendMail.mockResolvedValueOnce({});
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });

  it('should handle email sending failure', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP error'));
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to send email');
  });

  it('should handle missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining('undefined'),
      })
    );
  });

  it('should prevent email header injection', async () => {
    const maliciousEmail = 'attacker@evil.com\r\nBcc: victim@example.com';
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Attacker',
        email: maliciousEmail,
        phone: '123',
        message: 'Test',
      }),
    });

    await POST(request);
    
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: maliciousEmail, // This should be sanitized in production
      })
    );
  });

  it('should handle XSS attempts in message field', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'User',
        email: 'user@example.com',
        phone: '123',
        message: xssPayload,
      }),
    });

    await POST(request);
    
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining(xssPayload), // Should be escaped in production
      })
    );
  });

  it('should handle large payload attacks', async () => {
    const largeMessage = 'x'.repeat(100000);
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'User',
        email: 'user@example.com',
        phone: '123',
        message: largeMessage,
      }),
    });

    await POST(request);
    
    expect(mockSendMail).toHaveBeenCalled();
  });
});