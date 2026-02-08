import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { firstName, lastName, email, recipientName, amount, message } = data;

        // Konfiguration des Transporters (Hier müssen später die echten SMTP-Daten rein)
        // Für Development nutzen wir Ethereal Email (Fake SMTP) wenn keine env vars da sind
        // ODER wir loggen es nur, wenn kein Transporter konfiguriert ist.

        // ACHTUNG: Du musst diese Umgebungsvariablen in .env.local setzen!
        // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com", // Fallback oder Platzhalter
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // Deine Email
                pass: process.env.SMTP_PASS, // Dein App Password
            },
        });

        // E-Mail Inhalt
        const mailOptions = {
            from: '"Gutschein Anfrage" <no-reply@malia-hideaway.at>', // Absender
            to: "info@malia-alpine-hideaway.at", // Empfänger (Deine Hotel-Email)
            replyTo: email, // Damit du direkt dem Kunden antworten kannst
            subject: `Neue Gutschein-Anfrage von ${firstName} ${lastName}`,
            text: `
        Neue Gutschein-Anfrage
        
        VON:
        Name: ${firstName} ${lastName}
        Email: ${email}
        
        GUTSCHEIN DETAILS:
        Für: ${recipientName}
        Betrag: ${amount} €
        
        NACHRICHT / WIDMUNG:
        ${message}
      `,
            html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #7d3a2a; border-bottom: 2px solid #eee; padding-bottom: 10px;">Neue Gutschein-Anfrage</h2>
          
          <h3 style="margin-top: 20px;">Kontaktdaten:</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          
          <h3 style="margin-top: 20px; background-color: #f9f9f9; padding: 10px;">Gutschein Details:</h3>
          <p><strong>Für Wen:</strong> ${recipientName}</p>
          <p><strong>Betrag:</strong> <b>${amount} €</b></p>
          
          <h3 style="margin-top: 20px;">Persönliche Nachricht / Widmung:</h3>
          <blockquote style="background: #f0f0f0; border-left: 4px solid #7d3a2a; margin: 0; padding: 10px 20px;">
            ${message ? message.replace(/\n/g, '<br>') : '<i>Keine Nachricht</i>'}
          </blockquote>
        </div>
      `,
        };

        // Nur senden, wenn User/Pass konfiguriert sind, sonst simulieren
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully!");
        } else {
            console.log("WARNUNG: Keine SMTP-Zugangsdaten gefunden. Email wurde NICHT gesendet, aber geloggt.");
            console.log("Simulierte Email:", mailOptions);
        }

        return NextResponse.json({ message: 'Gutschein Anfrage erfolgreich gesendet' }, { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Fehler beim Senden der Email' }, { status: 500 });
    }
}
