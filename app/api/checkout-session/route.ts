import Stripe from 'stripe'
import { NextRequest } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    const { packageName, price } = await req.json();
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        success_url: "https://shuacapstudio.vercel.app/success",
    cancel_url: "https://shuacapstudio.vercel.app/cancel",
    // ====================================
        line_items: [
            {
                price_data: {
                    currency: 'gbp',
                    product_data: { name: packageName },
                    unit_amount: price * 100
                },
                quantity: 1
            },
        ],
        custom_fields: [
            {
                key: 'full_name',
                label: {
                    type: 'custom',
                    custom: 'Full Name'
                },
                type: 'text'
            },
            
        ],
        mode: "payment",
        
    });
    return Response.json({ url: session.url })
}