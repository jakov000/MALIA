import 'dotenv/config';
import { hash } from 'bcryptjs';
import { db } from '../lib/db';

async function main() {
  const password = await hash('Malia2026!', 10)
  
  const user = await db.user.upsert({
    where: { email: 'admin@malia.com' },
    update: {
      password: password,
      role: 'ADMIN'
    },
    create: {
      email: 'admin@malia.com',
      password: password,
      role: 'ADMIN'
    }
  })
  
  console.log('Admin user ready:', user.email)
}

main()
  .then(async () => {
    console.log("Done")
    process.exit(0)
  })
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
