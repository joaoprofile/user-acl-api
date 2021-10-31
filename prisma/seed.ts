import { PrismaClient } from '@prisma/client'

import { RolesSeed } from './seeds/RolesSeed'

const prisma = new PrismaClient()

async function main() {
  for (let role of RolesSeed) {
    await prisma.role.create({
      data: role
    })
  }
}

main().catch(e => {
  console.log(e)
}).finally(() => {
  prisma.$disconnect()
})