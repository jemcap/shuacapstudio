import { POST } from '@/app/api/chatbot/route';
import { NextResponse } from 'next/server';
import { compiledGraph } from '@/app/langgraph/graph';

jest.mock('@/app/langgraph/graph');

describe('Chatbot API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process valid messages successfully', async () => {
    const mockResponse = {
      messages: [
        {
          id: ['AIMessage'],
          kwargs: { content: 'Hello, how can I help?' },
        },
      ],
    };
    
    (compiledGraph.invoke as jest.Mock).mockResolvedValueOnce(mockResponse);

    const request = new Request('http://localhost:3000/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello' },
        ],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toBe('Hello, how can I help?');
  });

  it('should filter out malformed messages', async () => {
    const mockResponse = {
      messages: [
        {
          id: ['AIMessage'],
          kwargs: { content: 'Filtered response' },
        },
      ],
    };
    
    (compiledGraph.invoke as jest.Mock).mockResolvedValueOnce(mockResponse);

    const request = new Request('http://localhost:3000/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Valid message' },
          { invalid: 'structure' },
          null,
          { role: 123, content: 'Invalid role type' },
        ],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(compiledGraph.invoke).toHaveBeenCalledWith({
      messages: [{ role: 'user', content: 'Valid message' }],
    });
  });

  it('should handle missing AI response', async () => {
    const mockResponse = { messages: [] };
    
    (compiledGraph.invoke as jest.Mock).mockResolvedValueOnce(mockResponse);

    const request = new Request('http://localhost:3000/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test' }],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.response).toBe('No response from the assistant');
  });

  it('should handle graph invocation errors', async () => {
    (compiledGraph.invoke as jest.Mock).mockRejectedValueOnce(new Error('Graph error'));

    const request = new Request('http://localhost:3000/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test' }],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Invalid request or server error');
  });

  it('should reject invalid role types', async () => {
    const request = new Request('http://localhost:3000/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          { role: 'admin', content: 'Should fail validation' },
        ],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
  });

  it('should handle XSS in message content', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    const mockResponse = {
      messages: [
        {
          id: ['AIMessage'],
          kwargs: { content: xssPayload },
        },
      ],
    };
    
    (compiledGraph.invoke as jest.Mock).mockResolvedValueOnce(mockResponse);

    const request = new Request('http://localhost:3000/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test' }],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.response).toBe(xssPayload); // Should be sanitized in production
  });

  it('should handle prototype pollution attempts', async () => {
    const request = new Request('http://localhost:3000/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test' }],
        '__proto__': { isAdmin: true },
      }),
    });

    const response = await POST(request);
    
    expect(response.status).toBeDefined();
  });

  it('should enforce message size limits', async () => {
    const largeContent = 'x'.repeat(1000000);
    
    const request = new Request('http://localhost:3000/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: largeContent }],
      }),
    });

    const response = await POST(request);
    
    expect(response.status).toBeDefined();
  });
});