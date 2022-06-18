import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Layout from '../../template/Layout'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useStoreActions } from 'easy-peasy'

export default function Articles({ articlesList }) {

  const [alert, setAlert] = useState(false)
  const [panier, setPanier] = useState([])

  // STORE
  const cartActions = useStoreActions((actions) => actions.cart)

  /**
   * Au chargement :
   * On check s'il y un localstorage pour ajout d'article
   * Si c'est le cas on affiche une alert
   */
  useEffect(() => {
    const addArtcile = localStorage.getItem('addArticle')
    if (addArtcile && addArtcile !== '') {
      setAlert(`Votre article ${addArtcile} a bien été ajoutée !`)
      localStorage.removeItem('addArticle')
    }

    let timer = setTimeout(() => {
      setAlert(false);
    }, 5000);

    return () => { clearTimeout(timer) };
  }, [])

  /**
   * Permet d'ajouter un produit au panier
   */
  const addProduct = useCallback(id => {
    const newPanier = [...panier]
    let update = false
    if (newPanier.length > 0) {
      newPanier.forEach((el, i) => {
        if (el.id === id) {
          const data = {
            id,
            count: el.count + 1
          }
          newPanier.splice(i, 1, data)
          console.log('id ok', newPanier)
          update = true
        }
      })

      if (!update) {
        newPanier.push({
          id,
          count: 1
        })
        console.log('add', newPanier)
      }
    } else {
      newPanier.push({
        id,
        count: 1
      })
    }
    setPanier(newPanier)

     // Increment le total de produit et le met dans le store
    cartActions.incrementCartCount()
  })

  /**
   * Permet de supprimer un produit du panier
   */
  const decreaseProduct = useCallback((id) => {
    const newPanier = [...panier]
    newPanier.forEach((el, i) => {
      if (el.id === id) {
        if ((el.count - 1) === 0) {
          newPanier.splice(i, 1)
          console.log(newPanier)
          console.log(i)
        } else {
          const data = {
            id,
            count: el.count - 1
          }
          newPanier.splice(i, 1, data)
          console.log('id ok', newPanier)
        }
      }
    })
    setPanier(newPanier)

    // Decrement le total de produit et le met dans le store
    cartActions.decrementCartCount()
  })

  return (
    <Layout head='Articles'>
      <h1 className="mt-80 has-text-centered is-size-1 has-text-weight-bold">Liste des Artciles</h1>
      {alert && (
        <Alert status='success'>
          <AlertIcon />
          {alert}
        </Alert>
      )}
      <div className="columns mt-4 is-flex is-flex-wrap-wrap">
        {articlesList.length > 0 ? articlesList.map(article => (
          <div className="column is-one-quarter" key={article.id}>
            <div className="card p-1">
              <div className="card-image">
                <figure className="image is-4by3">
                  <Image 
                    src={article.image !== null ? require(`../../public/images/articles/${article.image}`) : require('../../public/images/articles/default.jpg')}
                    layout='fill'
                    objectFit='contain'
                    alt={`Image de ${article.title}`}
                  />
                </figure>
              </div>
              <div className="card-content pt-1">
                <div className='h-80 is-flex is-justify-content-center is-align-items-center'>
                  <h2 className='is-size-4 has-text-centered has-text-weight-bold '>{article.title}</h2>
                </div>
                <hr className='mt-2 mb-4'/>
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-32x32">
                      <img className='is-rounded' src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-6">{article.userName}</p>
                    <p className="subtitle is-7">{article.createdAt}</p>
                  </div>
                </div>

                <div className="content">
                  <p className="is-truncated">
                    {article.description}
                  </p>
                  <div className="is-flex">
                    {article.categories.length > 0 ? article.categories.map((cat, index) => (
                      <a href="#" className='mx-1' key={index}>#{cat.categoryName}</a>
                    )) : (
                      <span>Pas de categories</span>
                    )}
                  </div>
                  <div className="mt-2 is-flex is-align-items-center">
                    <p className='m-0 is-size-3'>{article.price} €</p>
                    <div className='ml-auto is-flex is-align-items-center'>

                    {panier.length > 0 && panier.map((el, index) => (
                      el.id === article.id && (
                        <div className="is-flex is-align-items-center" key={index}>
                          <div className='button is-link is-rounded' onClick={() => decreaseProduct(article.id)}>-</div>
                          <div className='mx-2'>{el.count}</div>
                        </div>
                      )
                    ))}
                      <div className='button is-link is-rounded' onClick={() => addProduct(article.id)}>+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <h2>Pas d'articles</h2>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetch(`${process.env.REACT_APP_URL_API}/articles/getAllArticles`)
  const articlesList = await data.json()

  return {
    props: {
      articlesList
    }
  }
}
