import nodemailer from "nodemailer";

export async function sendConfirmationEmail(email: string, formLink: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="x-apple-disable-message-reformatting"/>
    <title>Payment Confirmation</title>
    <style>
      /* Reset and global */
      body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
      table, td { mso-table-rspace:0pt; mso-table-lspace:0pt; }
      img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; display:block; }
      a { text-decoration:none; color:#1a82e2; }
      body { margin:0; padding:0; width:100% !important; height:100% !important; }

      /* Container */
      .email-container {
        max-width:600px;
        margin:0 auto;
      }

      /* Button */
      .btn {
        background-color:#1a82e2;
        border-radius:4px;
        color:#ffffff;
        display:inline-block;
        font-size:16px;
        line-height:24px;
        padding:12px 24px;
        text-align:center;
      }

      /* Footer */
      .footer {
        font-size:12px;
        line-height:16px;
        color:#666666;
        padding:20px;
        text-align:center;
      }
    </style>
  </head>
  <body style="background-color:#f4f4f4;">
    <!-- Preheader Text : hidden in email body but visible in inbox preview -->
    <div style="display:none; font-size:1px; color:#f4f4f4; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
      Thanks for your purchase! Please complete the quick form so we know who this is for.
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:20px 0;">
          <table role="presentation" class="email-container" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
            <!-- Header / Logo -->
            <tr>
              <td align="center" style="padding:20px;">
                <img src="https://shuacapstudio-assets.s3.eu-west-2.amazonaws.com/shuacapstudiologo.png"
                     width="250"
                     alt="Shuacap Studio Logo"
                     style="display:block;"/>
              </td>
            </tr>

            <!-- Hero / Greeting -->
            <tr>
              <td style="padding:0 30px 20px; font-family:Arial, sans-serif; font-size:18px; line-height:24px; color:#333333;">
                <h1 style="margin:0 0 10px; font-size:24px; line-height:28px; color:#333333;">Hi there!</h1>
                <p style="margin:0 0 16px;">Thank you for your purchase! I'm excited to get started.</p>
                <p style="margin:0 0 24px;">
                  To make sure we've got all the details right, please fill out this quick form:
                </p>
                <p style="text-align:center;">
                  <a href="${formLink}" class="btn" target="_blank">Fill Out the Form</a>
                </p>
              </td>
            </tr>

            <!-- Optional: Additional info -->
            <tr>
              <td style="padding:0 30px 30px; font-family:Arial, sans-serif; font-size:14px; line-height:20px; color:#666666;">
                <p style="margin:0;">If the button doesn't work, copy and paste the following URL into your browser:</p>
                <p style="word-break:break-all; margin:8px 0 0;"><a href="${formLink}" target="_blank">${formLink}</a></p>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table role="presentation" class="email-container" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td class="footer">
                &copy; ${new Date().getFullYear()} Shuacap Studio. All rights reserved.<br/>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  try {
    await transporter.sendMail({
      from: `"SHUACAP STUDIO" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your SHUACAP STUDIO Purchase Confirmation",
      html: htmlContent,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
