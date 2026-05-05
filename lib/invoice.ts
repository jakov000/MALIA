import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateInvoicePdf(booking: any, invoiceNumber: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const drawText = (text: string, x: number, y: number, size = 10, isBold = false) => {
    page.drawText(text, { x, y: height - y, size, font: isBold ? boldFont : font });
  };

  const drawRightText = (text: string, rightX: number, y: number, size = 10, isBold = false) => {
    const textWidth = (isBold ? boldFont : font).widthOfTextAtSize(text, size);
    page.drawText(text, { x: rightX - textWidth, y: height - y, size, font: isBold ? boldFont : font });
  };

  // --- Header Left: Company Info ---
  drawText('MALIA - Alpine Hideaway', 50, 50, 16, true);
  drawText('Madleine und Julia Rieser', 50, 70);
  drawText('Ländbergstraße 6', 50, 85);
  drawText('6213 Pertisau', 50, 100);
  drawText('Österreich', 50, 115);

  // --- Billing Address ---
  drawText('MALIA - Alpine Hideaway | Ländbergstraße 6 | 6213 Pertisau', 50, 160, 10);
  // Underline
  page.drawLine({ start: { x: 50, y: height - 162 }, end: { x: 300, y: height - 162 }, thickness: 1 });
  
  drawText(booking.guestName, 50, 185, 12);
  const lines = (booking.guestAddress || '').split(',').map((l: string) => l.trim());
  lines.forEach((line: string, i: number) => drawText(line, 50, 205 + i * 15, 12));

  // --- Invoice Details (Right) ---
  drawRightText('RECHNUNG', 545, 50, 20, true);
  
  const invoiceDate = new Date().toLocaleDateString('de-DE');
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);
  const dueDateStr = dueDate.toLocaleDateString('de-DE');
  
  drawRightText(`Rechnungsnummer: ${invoiceNumber}`, 545, 85);
  drawRightText(`Rechnungsdatum: ${invoiceDate}`, 545, 100);
  drawRightText(`Fälligkeitsdatum: ${dueDateStr}`, 545, 115);
  
  drawRightText(`OFFENER BETRAG: € ${booking.totalPrice.toFixed(2)}`, 545, 145, 12, true);
  
  // --- Table Header ---
  const tableTop = 250;
  drawText('Pos', 50, tableTop, 10, true);
  drawText('Leistung', 100, tableTop, 10, true);
  drawRightText('Preis in €', 545, tableTop, 10, true);
  
  page.drawLine({ start: { x: 50, y: height - tableTop - 10 }, end: { x: 545, y: height - tableTop - 10 }, thickness: 1 });

  // --- Table Row ---
  const rowTop = 280;
  const startStr = new Date(booking.startDate).toLocaleDateString('de-DE');
  const endStr = new Date(booking.endDate).toLocaleDateString('de-DE');
  
  drawText('1', 50, rowTop);
  drawText(`Übernachtung ${booking.room} (${startStr} - ${endStr})`, 100, rowTop);
  drawRightText(booking.totalPrice.toFixed(2), 545, rowTop);
  
  page.drawLine({ start: { x: 50, y: height - rowTop - 15 }, end: { x: 545, y: height - rowTop - 15 }, thickness: 1 });

  // --- Totals ---
  const totalTop = 330;
  const netto = booking.totalPrice / 1.1;
  const ust = booking.totalPrice - netto;

  drawText('Summe netto', 300, totalTop);
  drawRightText(netto.toFixed(2), 545, totalTop);
  
  drawText('Umsatzsteuer 10%', 300, totalTop + 20);
  drawRightText(ust.toFixed(2), 545, totalTop + 20);
  
  drawText('Summe brutto', 300, totalTop + 40, 10, true);
  drawRightText(booking.totalPrice.toFixed(2), 545, totalTop + 40, 10, true);

  drawText('OFFENER BETRAG', 300, totalTop + 60, 10, true);
  drawRightText(booking.totalPrice.toFixed(2), 545, totalTop + 60, 10, true);

  // --- Footer ---
  const footerY = 650;
  drawText(`Bitte überweisen Sie den Rechnungsbetrag innerhalb von 7 Tagen nach Erhalt der Rechnung unter Angabe`, 50, footerY);
  drawText(`Ihrer Rechnungsnummer und Ihrem Nachnamen.`, 50, footerY + 15);
  
  drawText('Mit freundlichen Grüßen,', 50, footerY + 45);
  drawText('MALIA - Alpine Hideaway', 50, footerY + 60);
  drawText('Madleine und Julia Rieser', 50, footerY + 75);

  const grayColor = rgb(0.5, 0.5, 0.5);
  page.drawText('MALIA - Alpine Hideaway | Ländbergstraße 6, 6213 Pertisau, Österreich | E-Mail: info@malia-alpine-hideaway.at', {
    x: width / 2 - font.widthOfTextAtSize('MALIA - Alpine Hideaway | Ländbergstraße 6, 6213 Pertisau, Österreich | E-Mail: info@malia-alpine-hideaway.at', 8) / 2,
    y: height - 760,
    size: 8,
    font,
    color: grayColor
  });
  page.drawText('Bankverbindung: Sparkasse Rattenberg | Konto Inhaber: Madleine Rieser Julia Rieser | IBAN: AT23 2050 8000 0003 7341 | BIC: SPRTAT21XXX', {
    x: width / 2 - font.widthOfTextAtSize('Bankverbindung: Sparkasse Rattenberg | Konto Inhaber: Madleine Rieser Julia Rieser | IBAN: AT23 2050 8000 0003 7341 | BIC: SPRTAT21XXX', 8) / 2,
    y: height - 775,
    size: 8,
    font,
    color: grayColor
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
