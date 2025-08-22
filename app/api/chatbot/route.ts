import { NextResponse, NextRequest } from "next/server";
import { compiledGraph } from "@/app/langgraph/graph";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { withRateLimit, chatbotRateLimiter } from '@/lib/rate-limiter';

const MessageSchema = z.array(
  z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().max(10000), // Limit message size
  })
);

// Sanitize content to prevent XSS
function sanitizeContent(content: string): string {
  // Remove any script tags and dangerous HTML
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });
}

export async function POST(req: NextRequest) {
  return withRateLimit(req, chatbotRateLimiter, async () => {
    try {
    const body = await req.json();
    
    // Validate request size
    const bodyString = JSON.stringify(body);
    if (bodyString.length > 100000) {
      return NextResponse.json(
        { error: "Request too large" },
        { status: 413 }
      );
    }
    
    // Defensive: filter out any malformed messages
    const safeMessages = Array.isArray(body.messages)
      ? body.messages.filter(
          (msg: unknown): msg is { role: string; content: string } =>
            typeof msg === "object" &&
            msg !== null &&
            "role" in msg &&
            "content" in msg &&
            typeof (msg as any).role === "string" &&
            typeof (msg as any).content === "string"
        )
      : [];

    // Validate and sanitize messages
    const parsedMsg = MessageSchema.parse(safeMessages);
    
    // Sanitize user input before processing
    const sanitizedMessages = parsedMsg.map(msg => ({
      ...msg,
      content: sanitizeContent(msg.content)
    }));

    const output = await compiledGraph.invoke({ messages: sanitizedMessages });

    const aiMessage = output.messages.find((msg: any) => 
      Array.isArray(msg.id) &&
      msg.id.includes("AIMessage") &&
      msg.kwargs &&
      typeof msg.kwargs.content === "string"
    ) as any;

    const rawContent = aiMessage?.kwargs?.content ?? "No response from the assistant";
    
    // Sanitize AI response before sending to client
    const sanitizedResponse = sanitizeContent(rawContent);

    return NextResponse.json({ response: sanitizedResponse });
  } catch (error) {
    console.error("API Error", error);
      return NextResponse.json(
        { error: "Invalid request or server error" },
        { status: 500 }
      );
    }
  });
}
