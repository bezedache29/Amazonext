import prisma from '../../../utils/prisma.js'

export default async function handle(req, res) {

  const { userName } = req.query

  try {
    const results = await prisma.address.findMany({
      where: {
        userName: userName
      }
    })
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}