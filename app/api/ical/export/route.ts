import { NextResponse } from 'next/server';
import ical from 'ical-generator';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Fetch all PAID bookings and manually blocked dates
    const bookings = await db.booking.findMany({
      where: { status: 'PAID' },
      select: { id: true, startDate: true, endDate: true, guestName: true }
    });

    const blockedDates = await db.blockedDate.findMany({
      select: { id: true, startDate: true, endDate: true, reason: true }
    });

    // Create the calendar feed
    const calendar = ical({
      name: 'Malia / Villa Tirol Verfügbarkeiten',
      timezone: 'Europe/Vienna',
    });

    // Add bookings to calendar (as 'Malia Booking' to maintain privacy of guest names)
    bookings.forEach(booking => {
      calendar.createEvent({
        start: booking.startDate,
        end: booking.endDate,
        summary: 'Reserviert - Malia', // Airbnb/Booking only read dates, but summary is good practice
        description: `Booking ID: ${booking.id}`,
        id: `booking-${booking.id}@villatirol.at`,
        allDay: true, // Typical for rentals
      });
    });

    // Add manually blocked dates to calendar
    blockedDates.forEach(block => {
      calendar.createEvent({
        start: block.startDate,
        end: block.endDate,
        summary: block.reason || 'Blockiert - Malia',
        description: `Blocked ID: ${block.id}`,
        id: `block-${block.id}@villatirol.at`,
        allDay: true,
      });
    });

    // Return the .ics text format
    return new NextResponse(calendar.toString(), {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="malia.ics"',
      },
    });

  } catch (error) {
    console.error('iCal Export Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
