import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { withRateLimit, contactRateLimiter } from '@/lib/rate-limiter';

// Input validation schema
const contactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(255),
    phone: z.string().min(10).max(20).regex(/^[\d\s\-\+\(\)]+$/),
    message: z.string().min(10).max(5000).optional()
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
        const data = contactSchema.parse(body);
        
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
            subject: "Project Inquiry",
            text: `Hi Josh,

${data.message || "I'm looking forward to discussing this potential project with you."}

Best regards,  
${sanitizeText(data.name)}  
Email: ${data.email}  
Phone: ${sanitizeText(data.phone)}`,
        };
        
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
        
    } catch (error) {
        console.error('Contact form error:', error);
        
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