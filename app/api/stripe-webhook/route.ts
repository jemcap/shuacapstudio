import { NextRequest } from "next/server";
import Stripe from "stripe";
import { sendConfirmationEmail } from "@/lib/sendConfirmation";
import { ChartNoAxesGantt } from "lucide-react";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "charge.succeeded") {
    const session = event.data.object as Stripe.Charge;
    const email = session.billing_details.email;
    if (email) {
      await sendConfirmationEmail(email, "https://docs.google.com/forms/d/1on9IUzlGnwpYg8OzhfH-dBqulo_k2AE6zGMzSJg7rvY/edit");
    }
  }

  return new Response("ok");
}