import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
// Reuse the existing Next.js transporter or create a new one
// Assuming SMTP settings are provided in .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: parseInt(process.env.SMTP_PORT || "587") === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.SMTP_FROM || '"Malia Villa Tirol" <info@villatirol.at>';

export async function sendBookingConfirmation(email: string, name: string, startDate: Date, endDate: Date, invoicePdfBuffer?: Buffer) {
  const attachments = [];
  
  // Static PDFs - assuming they are placed in public/
  const rulesPath = path.join(process.cwd(), "public", "hausregeln.pdf");
  const restaurantPath = path.join(process.cwd(), "public", "restaurantempfehlung.pdf");
  
  if (fs.existsSync(rulesPath)) {
    attachments.push({
      filename: "Hausregeln_und_Stornobedingungen.pdf",
      path: rulesPath
    });
  } else {
    console.warn("hausregeln.pdf not found in public folder");
  }

  if (fs.existsSync(restaurantPath)) {
    attachments.push({
      filename: "Restaurantempfehlung.pdf",
      path: restaurantPath
    });
  } else {
    console.warn("restaurantempfehlung.pdf not found in public folder");
  }

  if (invoicePdfBuffer) {
    attachments.push({
      filename: "Rechnung.pdf",
      content: invoicePdfBuffer,
    });
  }

  const mailOptions = {
    from: FROM_EMAIL,
    to: email,
    subject: "MALIA - Reservierungsbestätigung",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; line-height: 1.6;">
        <p>Herzlichen Glückwunsch – Ihr Aufenthalt im MALIA – Alpine Hideaway ist bestätigt.</p>
        <p>Wir freuen uns sehr, Sie bald bei uns begrüßen zu dürfen und Ihnen eine besondere Zeit in den Tiroler Alpen zu ermöglichen.</p>
        <p>Damit Ihr Aufenthalt von Anfang an entspannt und reibungslos verläuft, haben wir hier die wichtigsten Informationen für Sie zusammengestellt:</p>
        
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
        
        <p><strong>An- & Abreise</strong><br/>
        Check-in: ab 15:00 Uhr<br/>
        Check-out: bis 10:00 Uhr</p>

        <p><strong>WLAN & Technik</strong><br/>
        WLAN-Name: Home<br/>
        Passwort: Timi125!</p>

        <p><strong>Parken</strong><br/>
        Überdachte Parkmöglichkeiten befinden sich direkt hinter dem Haus.</p>

        <p><strong>Rauchen & Haustiere</strong><br/>
        Rauchen ist ausschließlich im Außenbereich erlaubt.<br/>
        Hunde sind auf Anfrage herzlich willkommen.<br/>
        Bitte kontaktieren Sie uns vorab, damit auch Ihre vierbeinigen Begleiter einen angenehmen Aufenthalt bei uns genießen können.</p>

        <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">

        <p><strong>Kontakt</strong><br/>
        Wir wollen Ihren Aufenthalt so entspannt wie möglich gestalten und freuen uns, wenn wir Ihnen helfen können. Bitte kontaktieren Sie uns bei Fragen, Anliegen oder im Fall von Schäden jederzeit.<br/>
        Julia: +43 676 5925596<br/>
        Madleine: +43 676 6207866</p>

        <p><strong>Restaurant-Empfehlungen</strong><br/>
        Im Anhang finden Sie unsere persönlich kuratierten Restaurantempfehlungen –<br/>
        für besondere Abende rund um Ihren Aufenthalt.</p>
        
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">

        <p>Mit der Reservierungsbestätigung Ihres Aufenthaltes stimmen sie unseren Haus- sowie unseren Storno-Regelungen zu, diese finden Sie im Anhang.</p>

        <p>Wir freuen uns sehr darauf, Sie bald im MALIA willkommen zu heißen und Ihnen einen angenehmen Aufenthalt zu bereiten.</p>

        <p>Herzliche Grüße<br/>
        vom MALIA – Alpine Hideaway<br/>
        Julia und Madleine</p>

        <p style="margin-top: 30px;">
          <a href="https://www.instagram.com/malia.alpine.hideaway?utm_source=qr" target="_blank" style="text-decoration: none; color: #333; display: flex; align-items: center; gap: 8px;">
            📲 Folge uns auf Instagram
          </a>
        </p>
      </div>
    `,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(\`Booking confirmation sent to \${email}\`);
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
  }
}

export async function sendAdminNotification(booking: any) {
  const mailOptions = {
    from: FROM_EMAIL,
    to: FROM_EMAIL, // Admin receives it at their own email
    subject: `Neue Buchung: ${booking.room} - ${booking.guestName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Neue Buchung eingegangen!</h2>
        <p>Ein Gast hat soeben einen Aufenthalt gebucht und per Stripe bezahlt.</p>
        <ul>
          <li><strong>Gast:</strong> ${booking.guestName} (${booking.guestEmail})</li>
          <li><strong>Hideaway:</strong> ${booking.room}</li>
          <li><strong>Gästezahl:</strong> ${booking.guests}</li>
          <li><strong>Zeitraum:</strong> ${booking.startDate.toLocaleDateString('de-DE')} - ${booking.endDate.toLocaleDateString('de-DE')}</li>
          <li><strong>Umsatz:</strong> €${booking.totalPrice.toFixed(2)}</li>
          <li><strong>Notizen:</strong> ${booking.notes || "-"}</li>
        </ul>
        <p>Die Buchung ist nun im Admin Dashboard als PAID markiert und der Kalender ist geblockt.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Admin notification sent to ${FROM_EMAIL}`);
  } catch (error) {
    console.error("Error sending admin notification:", error);
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
