import { NextResponse } from "next/server";
import { compiledGraph } from "@/app/langgraph/graph";
import { z } from "zod";

const MessageSchema = z.array(
  z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Defensive: filter out any malformed messages
    const safeMessages = Array.isArray(body.messages)
      ? body.messages.filter(
          (msg: any) =>
            typeof msg === "object" &&
            typeof msg.role === "string" &&
            typeof msg.content === "string"
        )
      : [];

    const parsedMsg = MessageSchema.parse(safeMessages);

    const output = await compiledGraph.invoke({ messages: parsedMsg });

    const aiMessage = output.messages.find((msg: any) => msg._getType?.() === "ai");

    const content = aiMessage?.content ?? "No response from the assistant";

    return NextResponse.json({ response: content });
  } catch (error) {
    console.error("API Error", error);
    return NextResponse.json(
      { error: "Invalid request or server error" },
      { status: 500 }
    );
  }
}
