import { loginValidation } from '../../../utils/authValidation'
import prisma from '../../../utils/prisma'

export default async function Login(req, res) {

  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const dotenv = require('dotenv')
  dotenv.config()

  const { email, password } = req.body

  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(400).send({message: 'Invalid Email or Password.'})

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) return res.status(400).send({message: 'Invalid Email or Password.'})

  const token = jwt.sign({user: {
    id: user.id,
    pseudo: user.pseudo,
    email: user.email
  }}, process.env.TOKEN_SECRET)

  return res.status(200).send({user, token})
}
