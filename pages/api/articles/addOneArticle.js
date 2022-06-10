import prisma from '../../../utils/prisma'
import formidable from 'formidable'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { getCookie } from 'cookies-next'

let mv = require('mv')

const jwt = require('jsonwebtoken')

export const config = {
  api: {
     bodyParser: false,
  }
}

export default async function AddOneArticle(req, res) {

  const userJwt = getCookie('jwt', { req, res }) // Cookie du user pour avoir son userName

  const decodeJwt = jwt.decode(userJwt, { complete: true }) // Decode le JWT
  const userName = decodeJwt.payload.user.pseudo // Pseudo du user connecté

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const form = new formidable.IncomingForm()
  try {
    form.parse(req, async (err, fields, files) => {
      if (err) throw err

      let article = {
        title: fields.title,
        description: fields.description,
        price: (fields.price).toString(),
        quantity: Number(fields.quantity),
        userName: userName,
        categories: JSON.parse(fields.categories)
      }

      if (files.image) {

        const oldPath = files.image.filepath; // Chemin temp stokage fichier
        const extension = files.image.originalFilename.split('.').pop() // Extension du fichier
        const imageName = uuidv4() + '--' + getRandomInt(1000, 2000) + '.' + extension // Nouveau nom de l'image
        fs.mkdir(`./public/images/articles/${new Date().getFullYear()}`, err => {}) // Création du dossier avec la date d'année
        const newPath = `./public/images/articles/${new Date().getFullYear()}/${imageName}` // Emplacement ou sera stocké l'image
        mv(oldPath, newPath, function(err) {}) // On deplace l'image du dossier temp au server

        article = {
          ...article,
          image:  new Date().getFullYear() + '/' + imageName
        }
      }

      console.log(article)

      const cats = JSON.parse(fields.categories)
      // Envoie en DB
      const result = await prisma.article.create({
        data: {
          title: article.title,
          description: article.description,
          price: article.price,
          userName: article.userName,
          quantity: article.quantity !== '' ? +article.quantity : 1,
          image: article.image ? article.image : null,
          categories: {
            create: cats.map(category => ({
              assignedAt: new Date(),
              category: {
                connect: {
                  name: category
                }
              }
            }))
          }
        }
      })
      return res.status(201).json(result)
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }


}
