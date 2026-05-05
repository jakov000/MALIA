import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import dotenv from 'dotenv'

dotenv.config()
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const blocks = await prisma.blockedDate.findMany();
  console.log("Blocks:", blocks.length);
  console.log(blocks);
}

main().catch(console.error).finally(() => prisma.$disconnect());
