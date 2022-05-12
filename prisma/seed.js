import Prisma from '@prisma/client'
import categories from './seeders/categories.js'
import users from './seeders/users.js'
import articles from './seeders/articles.js'
import addresses from './seeders/addresses.js'
import roles from './seeders/roles.js'
import payments from './seeders/payments.js'
const { PrismaClient } = Prisma


const prisma = new PrismaClient()

async function main() {
    await prisma.payment.createMany({
      data: payments
    })
    await prisma.role.createMany({
      data: roles
    })
    await prisma.category.createMany({
      data: categories
    })
    await prisma.user.createMany({
      data: users
    })
    await prisma.article.createMany({
      data: articles
    })
    await prisma.address.createMany({
      data: addresses
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })