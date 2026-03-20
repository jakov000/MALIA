import * as dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({ path: resolve(__dirname, '../.env.local') })
dotenv.config({ path: resolve(__dirname, '../.env') })

import { db } from '../lib/db'

async function main() {
  const start = new Date("2026-03-25T12:00:00Z");
  const end = new Date("2026-03-28T12:00:00Z");
  
  const booking = await db.booking.create({
    data: {
      guestName: "Max Mustermann (Test)",
      guestEmail: "test@malia.com",
      startDate: start,
      endDate: end,
      room: "THE ALPINE HIDEAWAY",
      guests: 2,
      totalPrice: 750,
      status: "PAID", 
      source: "DIRECT"
    } as any
  })

  
  console.log("✅ Testbuchung erfolgreich erstellt! ID:", booking.id)
  console.log(`Zeitraum: ${start.toLocaleDateString()} bis ${end.toLocaleDateString()}`)
}

main()
  .then(() => db.$disconnect())
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
