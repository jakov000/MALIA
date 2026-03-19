export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    // In a real cron job, you would use a cron secret instead of a session
    if (!session || !session.user) {
      const authHeader = req.headers.get('Authorization');
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }

    const body = await req.json().catch(() => ({}));
    const urlsToSync = body.urls || [];
    
    // Add default URLs from env if none provided
    if (urlsToSync.length === 0) {
      if (process.env.AIRBNB_ICAL_URL) urlsToSync.push(process.env.AIRBNB_ICAL_URL);
      if (process.env.BOOKING_ICAL_URL) urlsToSync.push(process.env.BOOKING_ICAL_URL);
    }

    let importedCount = 0;

    // Dynamically import node-ical to avoid build-time BigInt/Turbopack errors
    const ical = (await import('node-ical')).default || await import('node-ical');

    for (const url of urlsToSync) {
      // 1. Fetch data from the URL
      const data = await ical.async.fromURL(url);
      
      // Determine source based on URL content for clarity
      let sourceName = "EXTERNAL_SYNC";
      if (url.includes('airbnb')) sourceName = "AIRBNB";
      if (url.includes('booking')) sourceName = "BOOKING";

      // 2. Remove old syncs for this specific source (to avoid duplicates or outdated cancellations)
      // Caution: this deletes everything from that source!
      await db.blockedDate.deleteMany({
        where: { source: sourceName }
      });

      // 3. Process new events
      for (const k in data) {
        if (Object.hasOwn(data, k)) {
          const event: any = data[k];
          
          if (event && event.type === 'VEVENT' && event.start && event.end) {
            await db.blockedDate.create({
              data: {
                startDate: new Date(event.start),
                endDate: new Date(event.end),
                reason: event.summary || `Imported Block from ${sourceName}`,
                source: sourceName,
              }
            });
            importedCount++;
          }
        }
      }
    }

    return NextResponse.json({ success: true, importedCount });

  } catch (error) {
    console.error('iCal Import Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
