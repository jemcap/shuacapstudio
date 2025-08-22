import Stripe from 'stripe'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Input validation schema - flexible for dynamic packages
const checkoutSchema = z.object({
    packageName: z.string().min(1).max(200),
    price: z.number().positive().max(10000) // Max £10,000 to prevent abuse
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Validate input structure and basic security
        const { packageName, price } = checkoutSchema.parse(body);
        
        // Basic security: prevent extremely low prices (potential abuse)
        if (price < 1) {
            return Response.json(
                { error: 'Invalid price amount' },
                { status: 400 }
            );
        }
        
        // Sanitize package name for Stripe
        const sanitizedPackageName = packageName.trim().slice(0, 100);
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            success_url: "https://www.shuacapstudio.com/success",
            cancel_url: "https://www.shuacapstudio.com/cancel",
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: { name: sanitizedPackageName },
                        unit_amount: Math.round(price * 100) // Convert to pence/cents
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
    } catch (error) {
        console.error('Checkout session error:', error);
        
        if (error instanceof z.ZodError) {
            return Response.json(
                { error: 'Invalid request data', details: error.errors },
                { status: 400 }
            );
        }
        
        if (error instanceof Stripe.errors.StripeError) {
            return Response.json(
                { error: 'Payment processing error. Please try again.' },
                { status: 500 }
            );
        }
        
        return Response.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}