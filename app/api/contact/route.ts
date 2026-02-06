import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Received inquiry:', data);

        // HIER WÜRDE MAN NODEMAILER EINBINDEN
        // Beispiel (Pseudocode):
        // await transporter.sendMail({
        //   from: '"Website Anfrage" <website@malia-hideaway.at>',
        //   to: "hello@malia-hideaway.at",
        //   subject: `Neue Anfrage von ${data.firstName} ${data.lastName}`,
        //   text: `...`
        // });

        // Simuliere Erfolg
        return NextResponse.json({ success: true, message: "Anfrage empfangen" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Fehler beim Senden" }, { status: 500 });
    }
}
