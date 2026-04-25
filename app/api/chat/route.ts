import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { knowledgeBase } from "@/lib/knowledge-base";
import { getRelevantChunks } from "@/lib/bm25";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_COUNT = 20;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
    rateLimitMap.set(ip, userData);
    return false;
  }

  userData.count++;
  rateLimitMap.set(ip, userData);
  return userData.count > RATE_LIMIT_COUNT;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : "anonymous";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { 
        status: 429,
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
  }

  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. BM25 Retrieval
    const relevantChunks = getRelevantChunks(message, knowledgeBase, 3);
    const contextText = relevantChunks
      .map((c) => `--- ${c.title} ---\n${c.content}`)
      .join("\n\n");

    // 2. Build System Prompt
    const systemPrompt = `You are "PodBot", the official assistant for The Sports Pod in Dallas. 
Your SOLE purpose is to answer questions about the clinic's services, staff, location, and booking.

STRICT RULES:
1. ONLY answer based on the provided CONTEXT. If the information is not in the context, politely say you don't have that specific detail and offer to help with what you do know.
2. NEVER guess or invent numbers (e.g., team size, prices, years) or details that are not explicitly stated in the context.
3. If a user asks about programming, math, history, or ANY topic outside of sports rehab/The Sports Pod, you MUST politely refuse.
4. NEVER include raw booking URLs (airtable.com links) in your text response. A "Book Appointment" button will be automatically provided. 
5. Keep responses short (2-3 sentences), friendly, and conversational.
6. Always be honest. If a user corrects you or asks a specific question not in the context, stick to: "I don't have the exact number on hand, but our team is led by Dr. Blake Wu and Coach Eric Rosenstock."

Clinic Info:
- Phone: (214) 888-6769
- Email: info@thesportspod.co
- Booking: https://airtable.com/appofhO24o8DXcD75/pagrE6jeIGbrwnYCO/form

CONTEXT:
${contextText}`;

    // 3. Call Groq API with Streaming
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.slice(-10), // Last 10 turns
        { role: "user", content: message },
      ],
      stream: true,
      temperature: 0.2,
    });

    // 4. Create a ReadableStream for the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Sorry, I'm having trouble right now. Please call (214) 888-6769." },
      { 
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
  }
}
