import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import { formatDate } from "@/lib/utils";
import { z } from 'zod';
import { withRateLimit, contactRateLimiter } from '@/lib/rate-limiter';

// Input validation schema
const inquirySchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(255),
    phone: z.string().min(10).max(20).regex(/^[\d\s\-\+\(\)]+$/),
    packageName: z.string().min(1).max(100),
    eventLocation: z.string().min(5).max(500),
    eventDate: z.string(),
    additionalDetails: z.string().max(5000).optional()
});

// Sanitize text to prevent injection attacks
function sanitizeText(text: string): string {
    return text.replace(/[\r\n]/g, ' ').trim();
}

export async function POST(req: NextRequest) {
    return withRateLimit(req, contactRateLimiter, async () => {
        try {
        const body = await req.json();
        
        // Validate and sanitize input
        const data = inquirySchema.parse(body);
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        
        const mailOptions = {
            from: process.env.SMTP_USER, // Fixed sender address
            replyTo: data.email, // User email for replies
            to: process.env.SMTP_USER,
            subject: `Potential Project — ${sanitizeText(data.packageName)}`,
            text: `Hi Josh,

I'm interested in your package: ${sanitizeText(data.packageName)}. Please review my details at your convenience and get back to me when you can. Thanks!

Event Location: ${sanitizeText(data.eventLocation)}
Event Date: ${formatDate(data.eventDate)}

${data.additionalDetails ? sanitizeText(data.additionalDetails) : "I'm looking forward to discussing this potential project with you."}

Best regards,  
${sanitizeText(data.name)}  
Email: ${data.email}  
Phone: ${sanitizeText(data.phone)}`,
        };
        
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
        
    } catch (error) {
        console.error('Inquiry form error:', error);
        
        if (error instanceof z.ZodError) {
            return new Response(
                JSON.stringify({ 
                    error: "Invalid form data",
                    details: error.errors 
                }), 
                { status: 400 }
            );
        }
        
            return new Response(
                JSON.stringify({ error: "Failed to send email" }), 
                { status: 500 }
            );
        }
    });
}