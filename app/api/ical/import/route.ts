export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    // Only enforce authentication in production to allow local testing
    if (process.env.NODE_ENV !== 'development') {
      const session = await auth();
      if (!session || !session.user) {
        const authHeader = req.headers.get('Authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
          return new NextResponse('Unauthorized', { status: 401 });
        }
      }
    }

    let urlsToSync = [];
    try {
      const body = await req.json();
      if (body.urls) urlsToSync = body.urls;
    } catch(e) {
      // It's okay, maybe a GET request with no body
    }

    
    // Define the calendars and map them to their specific rooms
    const calendarsToSync = [
      { url: process.env.AIRBNB_ICAL_RESIDENCE, room: "THE RESIDENCE", source: "AIRBNB" },
      { url: process.env.AIRBNB_ICAL_RETREAT, room: "THE RETREAT", source: "AIRBNB" },
      { url: process.env.AIRBNB_ICAL_HIDEAWAY, room: "THE ALPINE HIDEAWAY", source: "AIRBNB" },
      { url: process.env.BOOKING_ICAL_RESIDENCE, room: "THE RESIDENCE", source: "BOOKING" },
      { url: process.env.BOOKING_ICAL_RETREAT, room: "THE RETREAT", source: "BOOKING" },
      { url: process.env.BOOKING_ICAL_HIDEAWAY, room: "THE ALPINE HIDEAWAY", source: "BOOKING" },
      // Support manual override from request body if needed
      ...urlsToSync.map((u: string) => ({ url: u, room: "ALL", source: u.includes('booking') ? 'BOOKING' : 'EXTERNAL' }))
    ].filter(c => c.url);

    let importedCount = 0;

    for (const cal of calendarsToSync) {
      if (!cal.url) continue;
      
      try {
        const response = await fetch(cal.url as string);
        if (!response.ok) continue;
        
        const icsData = await response.text();
        const events = parseICS(icsData);
        
        // Clear out old synced dates for this specific room and source
        await db.blockedDate.deleteMany({
          where: { source: cal.source, room: cal.room }
        });

        for (const event of events) {
          await db.blockedDate.create({
            data: {
              startDate: event.start,
              endDate: event.end,
              reason: event.summary || `Gast über ${cal.source}`,
              source: cal.source,
              room: cal.room
            }
          });
          importedCount++;
        }
      } catch (err) {
        console.error(`Error parsing ${cal.url}:`, err);
      }
    }

    return NextResponse.json({ success: true, importedCount });

  } catch (error: any) {
    console.error('iCal Import Error:', error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}

// Custom lightweight iCal parser to avoid node-ical Turbopack compiler bugs
function parseICS(icsData: string) {
  const events = [];
  const lines = icsData.split(/\r?\n/);
  let currentEvent: any = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('BEGIN:VEVENT')) {
      currentEvent = {};
    } else if (line.startsWith('END:VEVENT')) {
      if (currentEvent && currentEvent.start && currentEvent.end) {
        events.push(currentEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      if (line.startsWith('DTSTART')) {
        const val = line.substring(line.indexOf(':') + 1);
        currentEvent.start = parseIcalDate(val);
      } else if (line.startsWith('DTEND')) {
        const val = line.substring(line.indexOf(':') + 1);
        currentEvent.end = parseIcalDate(val);
      } else if (line.startsWith('SUMMARY')) {
        currentEvent.summary = line.substring(line.indexOf(':') + 1);
      }
    }
  }
  return events;
}

function parseIcalDate(val: string) {
  // val is like 20250323 or 20250323T140000Z
  const y = val.substring(0, 4);
  const m = val.substring(4, 6);
  const d = val.substring(6, 8);
  // Set to midday to safely avoid timezone offset shifting dates backwards into previous day
  return new Date(`${y}-${m}-${d}T12:00:00Z`);
}
