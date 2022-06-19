import prisma from '../../../utils/prisma'

export default async function AddOneArticle(req, res) {

  const { name, lastname, firstname, address, zipCode, city, userName } = req.body

  const newAddress = {
    name,
    lastname,
    firstname,
    address,
    zipCode: +zipCode,
    city,
    userName
  }

  console.log(newAddress)

  try {
    const results = await prisma.address.create({
      data: newAddress
    })
    return res.status(200).json(results)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
