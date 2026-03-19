import nodemailer from "nodemailer";

// Reuse the existing Next.js transporter or create a new one
// Assuming SMTP settings are provided in .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.SMTP_FROM || '"Malia Villa Tirol" <info@villatirol.at>';

export async function sendBookingConfirmation(email: string, name: string, startDate: Date, endDate: Date) {
  const mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: "Buchungsbestätigung - Malia Villa Tirol",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Vielen Dank für deine Buchung, ${name}!</h2>
        <p>Wir freuen uns sehr, dich bald in der Malia Villa Tirol begrüßen zu dürfen.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Dein Aufenthalt:</strong><br/>
          Anreise: ${startDate.toLocaleDateString('de-DE')}<br/>
          Abreise: ${endDate.toLocaleDateString('de-DE')}
        </div>
        <p>Wir haben deine Zahlung erhalten. Solltest du noch Fragen haben, antworte einfach auf diese E-Mail.</p>
        <p>Herzliche Grüße,<br/>Dein Malia Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation sent to ${email}`);
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
  }
}

export async function sendVoucherEmail(email: string, code: string, value: number, type: "FIXED" | "PERCENTAGE") {
  const discountText = type === "FIXED" ? `€${value.toFixed(2)}` : `${value}%`;
  
  const mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: "Dein Gutschein für Malia Villa Tirol",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center;">
        <h2>Ein Geschenk für dich!</h2>
        <p>Hier ist dein Gutscheincode für deinen nächsten Aufenthalt in der Malia Villa Tirol:</p>
        <div style="background-color: #1a1a1a; color: white; padding: 20px; border-radius: 8px; margin: 20px auto; width: fit-content; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
          ${code}
        </div>
        <p><strong>Wert: ${discountText}</strong></p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">
          Löse diesen Code einfach bei deiner nächsten Buchung über unsere Website ein.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Voucher email sent to ${email}`);
  } catch (error) {
    console.error("Error sending voucher email:", error);
  }
}
