import prisma from '../../../utils/prisma.js'

export default async function handle(req, res) {
  try {
    const results = await prisma.article.findMany({
      include: {
        reviews: true,
        comments: true,
        categories: true
      }
    })
    // results.forEach(article => {
    //   article.categories.forEach(cat => console.log(cat.categoryName))
    // })
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}