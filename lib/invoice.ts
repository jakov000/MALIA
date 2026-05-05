import PDFDocument from 'pdfkit';

export async function generateInvoicePdf(booking: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // --- Header Left: Company Info ---
      doc.fontSize(16).text('MALIA - Alpine Hideaway', 50, 50);
      doc.fontSize(10).text('Madleine und Julia Rieser', 50, 70);
      doc.text('Ländbergstraße 6', 50, 85);
      doc.text('6213 Pertisau', 50, 100);
      doc.text('Österreich', 50, 115);

      // --- Billing Address ---
      doc.fontSize(10).text('MALIA - Alpine Hideaway | Ländbergstraße 6 | 6213 Pertisau', 50, 160, { underline: true });
      doc.moveDown(1);
      doc.fontSize(12).text(booking.guestName);
      
      const lines = booking.guestAddress.split(',').map((l: string) => l.trim());
      lines.forEach((line: string) => doc.text(line));

      // --- Invoice Details (Right) ---
      doc.fontSize(20).text('RECHNUNG', 300, 50, { align: 'right' });
      doc.fontSize(10);
      
      const invoiceNumber = `RE-${booking.id.substring(0, 6).toUpperCase()}`;
      const invoiceDate = new Date().toLocaleDateString('de-DE');
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      const dueDateStr = dueDate.toLocaleDateString('de-DE');
      
      doc.text(`Rechnungsnummer: ${invoiceNumber}`, 300, 85, { align: 'right' });
      doc.text(`Rechnungsdatum: ${invoiceDate}`, 300, 100, { align: 'right' });
      doc.text(`Fälligkeitsdatum: ${dueDateStr}`, 300, 115, { align: 'right' });
      doc.moveDown(2);
      
      doc.fontSize(12).text(`OFFENER BETRAG: € ${booking.totalPrice.toFixed(2)}`, 300, doc.y, { align: 'right', stroke: true });
      
      // --- Table Header ---
      doc.moveDown(4);
      let tableTop = doc.y;
      doc.font('Helvetica-Bold');
      doc.text('Pos', 50, tableTop);
      doc.text('Leistung', 100, tableTop);
      doc.text('Preis in €', 400, tableTop, { align: 'right' });
      
      doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

      // --- Table Row ---
      doc.font('Helvetica');
      doc.moveDown(1);
      let rowTop = doc.y;
      
      const startStr = new Date(booking.startDate).toLocaleDateString('de-DE');
      const endStr = new Date(booking.endDate).toLocaleDateString('de-DE');
      
      doc.text('1', 50, rowTop);
      doc.text(`Übernachtung ${booking.room} (${startStr} - ${endStr})`, 100, rowTop, { width: 300 });
      doc.text(booking.totalPrice.toFixed(2), 400, rowTop, { align: 'right' });
      
      doc.moveTo(50, rowTop + 25).lineTo(550, rowTop + 25).stroke();

      // --- Totals ---
      doc.moveDown(2);
      let totalTop = doc.y;
      
      const netto = booking.totalPrice / 1.1;
      const ust = booking.totalPrice - netto;

      doc.text('Summe netto', 300, totalTop);
      doc.text(netto.toFixed(2), 400, totalTop, { align: 'right' });
      
      doc.text('Umsatzsteuer 10%', 300, totalTop + 15);
      doc.text(ust.toFixed(2), 400, totalTop + 15, { align: 'right' });
      
      doc.font('Helvetica-Bold');
      doc.text('Summe brutto', 300, totalTop + 35);
      doc.text(booking.totalPrice.toFixed(2), 400, totalTop + 35, { align: 'right' });

      doc.text('OFFENER BETRAG', 300, totalTop + 55);
      doc.text(booking.totalPrice.toFixed(2), 400, totalTop + 55, { align: 'right' });

      // --- Footer ---
      doc.font('Helvetica');
      doc.fontSize(10);
      doc.text(`Bitte überweisen Sie den Rechnungsbetrag innerhalb von 7 Tagen nach Erhalt der Rechnung unter Angabe Ihrer Rechnungsnummer und Ihrem Nachnamen.`, 50, 600, { width: 500 });
      doc.moveDown(2);
      doc.text('Mit freundlichen Grüßen,\nMALIA - Alpine Hideaway\nMadleine und Julia Rieser');

      doc.fontSize(8).fillColor('gray');
      doc.text('MALIA - Alpine Hideaway | Ländbergstraße 6, 6213 Pertisau, Österreich | E-Mail: info@malia-alpine-hideaway.at', 50, 720, { align: 'center' });
      doc.text('Bankverbindung: Sparkasse Rattenberg | Konto Inhaber: Madleine Rieser Julia Rieser | IBAN: AT23 2050 8000 0003 7341 | BIC: SPRTAT21XXX', 50, 735, { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
