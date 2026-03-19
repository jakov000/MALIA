import { z } from 'zod';

// We share this schema between frontend and backend
export const bookingFormSchema = z.object({
  guestName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein."),
  guestEmail: z.string().email("Bitte eine gültige E-Mail-Adresse angeben."),
  startDate: z.date({ message: "Startdatum fehlt" }),
  endDate: z.date({ message: "Enddatum fehlt" }),
  adults: z.number().min(1).max(10),
  children: z.number().min(0).max(10),
  notes: z.string().optional(),
  voucherCode: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
