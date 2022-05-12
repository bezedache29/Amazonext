import { registerValidation } from '../../../utils/authValidation'
import prisma from '../../../utils/prisma'

export default async function Register(req, res) {

  const bcrypt = require('bcrypt')

  const { email, pseudo, password } = req.body

  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const checkIfEmailExist = await prisma.user.findUnique({ where: { email } })
  if(checkIfEmailExist) return res.status(400).send({message: "L'email existe déjà"})

  const checkIfPseudoExists = await prisma.user.findUnique({ where: { pseudo } })
  if(checkIfPseudoExists) return res.status(400).send({message: "Ce pseudo est déjà utilisé"})

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = {
    email,
    pseudo,
    password: hashedPassword
  }

  try {
    const results = await prisma.user.create({
      data: user
    })
    return res.status(200).json(results)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
