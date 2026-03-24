import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['de', 'en'];

export default getRequestConfig(async ({requestLocale}) => {
  // In Next.js 15+, requestLocale is a Promise
  let locale = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  const validLocale = locale || 'de';
  if (!locales.includes(validLocale)) notFound();

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});
