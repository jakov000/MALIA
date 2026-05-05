import { generateInvoicePdf } from './lib/invoice';
import fs from 'fs';

const dummyBooking = {
  id: 'b_123456',
  guestName: 'Max Mustermann',
  guestAddress: 'Musterstraße 1, 12345 Musterstadt',
  startDate: new Date('2026-02-13'),
  endDate: new Date('2026-02-15'),
  room: 'THE HIDEAWAY',
  totalPrice: 2210.00
};

async function test() {
  try {
    const buffer = await generateInvoicePdf(dummyBooking);
    fs.writeFileSync('test_invoice_output.pdf', buffer);
    console.log('PDF generated successfully, size:', buffer.length);
  } catch (err) {
    console.error('Error generating PDF:', err);
  }
}

test();
