import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
    const data = await req.json();
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });
  
    const mailOptions = {
      from: data.email,
      to: process.env.SMTP_USER, 
      subject: "Project Inquiry",
      text: `Hi Josh,

${data.message || "I'm looking forward to discussing this potential project with you."}

Best regards,  
${data.name}  
Email: ${data.email}  
Phone: ${data.phone}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
  }