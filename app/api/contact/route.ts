import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Received inquiry:', data);

        const { title, firstName, lastName, email, phone, room, adults, children, checkIn, checkOut, message } = data;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: parseInt(process.env.SMTP_PORT || "587") === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || `"Website Anfrage" <${process.env.SMTP_USER}>`,
            to: "info@malia-alpine-hideaway.at",
            replyTo: email,
            subject: `Neue Anfrage von ${firstName} ${lastName}`,
            text: `
        Neue Anfrage über Website
        
        KONTAKT:
        Name: ${firstName} ${lastName}
        Email: ${email}
        Tel: ${phone || 'n/a'}
        
        REISEDATEN:
        Zimmer: ${room || 'Keine Wahl'}
        Anreise: ${checkIn || 'n/a'}
        Abreise: ${checkOut || 'n/a'}
        Personen: ${adults} Erwachsene, ${children} Kinder
        
        NACHRICHT:
        ${message}
      `,
            html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #3d3d29; border-bottom: 2px solid #eee; padding-bottom: 10px;">Neue Anfrage</h2>
          
          <h3 style="margin-top: 20px;">Kontaktdaten:</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || '-'}</p>
          
          <h3 style="margin-top: 20px; background-color: #f9f9f9; padding: 10px;">Reisedaten:</h3>
          <p><strong>Zimmer / Suite:</strong> ${room || '-'}</p>
          <div style="display: flex; gap: 20px;">
             <p><strong>Von:</strong> ${checkIn || '-'}</p>
             <p><strong>Bis:</strong> ${checkOut || '-'}</p>
          </div>
          <p><strong>Erwachsene:</strong> ${adults || 0}</p>
          <p><strong>Kinder:</strong> ${children || 0}</p>
          
          <h3 style="margin-top: 20px;">Nachricht:</h3>
          <blockquote style="background: #f0f0f0; border-left: 4px solid #3d3d29; margin: 0; padding: 10px 20px;">
            ${message ? message.replace(/\n/g, '<br>') : '<i>Keine Nachricht</i>'}
          </blockquote>
        </div>
      `,
        };

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully!");
        } else {
            console.log("WARNUNG: Keine SMTP-Zugangsdaten gefunden. Email wurde NICHT gesendet, aber geloggt.");
            console.log("Simulierte Inquiry Email:", mailOptions);
        }

        return NextResponse.json({ success: true, message: "Anfrage empfangen" });
    } catch (error) {
        console.error('Error handling inquiry:', error);
        return NextResponse.json({ success: false, message: "Fehler beim Senden" }, { status: 500 });
    }
}
