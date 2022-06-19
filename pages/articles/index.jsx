import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Layout from '../../template/Layout'
import { Alert, AlertIcon, useToast, Tooltip } from '@chakra-ui/react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useLocalStorage from '../../hooks/useLocalStorage'
import Link from 'next/link'
import { checkCookies } from 'cookies-next'

export default function Articles({ articlesList }) {

  const [isConnected, setIsConnected] = useState(false)
  const [alert, setAlert] = useState(false)
  const [panier, setPanier] = useState([])
  const [total, setTotal] = useState(0)

  const toast = useToast()

  // HOOKS
  const { addCartToLocalStorage, addTotalToLocalstorage } = useLocalStorage()

  // STORE
  const cartActions = useStoreActions((actions) => actions.cart)
  const cartStore = useStoreState((state) => state.cart)
  const cart = cartStore.cartList

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
   * Permet de check si le panier a ete reset depuis la page cart
   */
  useEffect(() => {
    if (localStorage.getItem('resetCart')) {
      toast({
        title: `Votre panier a bien été vidé !`,
        description: `Vous pouvez ajouter de nouveaux articles a l'intérieur`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      localStorage.removeItem('resetCart')
    }
  }, [])

  /**
   * Permet de check si le user est connecté
   */
  useEffect(() => {
    if (checkCookies('jwt')) {
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }
  }, [])

  /**
   * Permet de mettre le panier a vide, si le panier du store est vide
   */
  useEffect(() => {
    if (cart.length === 0) {
      setPanier([])
    }
  }, [cart])

  /**
   * Permet de mettre a jour le panier si le user a un panier dans le localstorage et qu'il se reconnecte/refresh
   */
  useEffect(() => {
    if (isConnected) {
      const cart = localStorage.getItem('cart')
      if (cart) {
        setPanier(JSON.parse(cart))
        cartActions.loadCart(JSON.parse(cart))
      }
    }
  }, [isConnected])

  /**
   * Permet de calculer le total des articles dans le panier
   */
  useEffect(() => {
    let total = 0
    let count = 0
    panier.forEach(article => {
      total += +article.price
      count += +article.count
    })
    setTotal(total.toFixed(2))
    addTotalToLocalstorage(total.toFixed(2))
    cartActions.addTotal(total.toFixed(2))
    cartActions.loadCount(count)
  }, [panier])

  /**
   * Permet d'ajouter un produit au panier
   */
  const addProduct = (article => {
    if (isConnected) {
      const newPanier = [...panier]
      let update = false
      let errorQuantity = false
      if (newPanier.length > 0) {
        newPanier.forEach((el, i) => {
          if (article.quantity <= el.count && el.id == article.id) {
            toast({
              title: `Impossible d'ajouter ce produit au panier`,
              description: `Désolé, il n'y a pas assez de ce produit en stock`,
              status: 'error',
              duration: 4000,
              isClosable: true,
            })
            errorQuantity = true
            update = true
          } else {
            if (el.id === article.id) {
              const data = {
                id: article.id,
                title: article.title,
                price: (+article.price + +el.price).toFixed(2),
                priceUnity: (+article.price).toFixed(2),
                image: article.image,
                from: article.userName,
                quantity: article.quantity,
                count: el.count + 1
              }
              newPanier.splice(i, 1, data)
              update = true
            }
          }
        })

        if (!update) {
          if (article.quantity > 0) {
            newPanier.push({
              id: article.id,
              title: article.title,
              price: (+article.price).toFixed(2),
              priceUnity: (+article.price).toFixed(2),
              image: article.image,
              from: article.userName,
              quantity: article.quantity,
              count: 1
            })
          } else {
            toast({
              title: `Impossible d'ajouter ce produit au panier`,
              description: `Désolé, il n'y a pas assez de ce produit en stock`,
              status: 'error',
              duration: 4000,
              isClosable: true,
            })
            errorQuantity = true
          }
        }
      } else {
        if (article.quantity > 0) {
          newPanier.push({
            id: article.id,
            title: article.title,
            price: (+article.price).toFixed(2),
            priceUnity: (+article.price).toFixed(2),
            image: article.image,
            from: article.userName,
            quantity: article.quantity,
            count: 1
          })
        } else {
          toast({
            title: `Impossible d'ajouter ce produit au panier`,
            description: `Désolé, il n'y a pas assez de ce produit en stock`,
            status: 'error',
            duration: 4000,
            isClosable: true,
          })
          errorQuantity = true
        }
      }
      if (!errorQuantity) {
        setPanier(newPanier)
        console.log('newPanier', newPanier)

        // Envoie le panier au store
        cartActions.loadCart(newPanier)

        // Increment le total de produit et le met dans le store
        cartActions.incrementCartCount()

        // Ajoute le panier en Localstorage
        addCartToLocalStorage(newPanier)

        toast({
          title: `Article ajouté au panier !`,
          description: `Un exemplaire de ${article.title} a bien été ajouté au panier`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: `Impossible d'ajouter ce produit au panier`,
        description: `Vous devez vous connecter pour ajouter un produit au panier`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  })

  /**
   * Permet de supprimer un produit du panier
   */
  const decreaseProduct = ((article) => {
    const newPanier = [...panier]
    newPanier.forEach((el, i) => {
      if (el.id === article.id) {
        if ((el.count - 1) === 0) {
          newPanier.splice(i, 1)
        } else {
          const data = {
            id: article.id,
            title: article.title,
            price: (+el.price - +article.price).toFixed(2),
            priceUnity: (+article.price).toFixed(2),
            image: article.image,
            from: article.userName,
            quantity: article.quantity,
            count: el.count - 1
          }
          newPanier.splice(i, 1, data)
        }
      }
    })
    setPanier(newPanier)
    console.log('newPanier', newPanier)

    // Envoie le panier au store
    cartActions.loadCart(newPanier)

    // Decrement le total de produit et le met dans le store
    cartActions.decrementCartCount()

    toast({
      title: `Article retiré du panier !`,
      description: `Un exemplaire de ${article.title} a bien été retiré du panier`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })

    // Ajoute le panier en Localstorage
    addCartToLocalStorage(newPanier)
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
          <div className="column is-one-quarter card-perso my-2" key={article.id}>
            <div className="card p-1">
              <Link href={`/articles/${article.id}`}>
                <div className="card-image  cursor-pointer">
                  <Tooltip label="Voir détails" aria-label='A tooltip' placement='top' bg="#3e56c4" color="white">
                    <figure className="image is-4by3">
                      <Image 
                        src={article.image !== null ? require(`../../public/images/articles/${article.image}`) : require('../../public/images/articles/default.jpg')}
                        layout='fill'
                        objectFit='contain'
                        alt={`Image de ${article.title}`}
                      />
                    </figure>
                  </Tooltip>
                </div>
              </Link>
              <div className="card-content pt-1">
                <div className='h-80 is-flex is-justify-content-center is-align-items-center'>
                  <h2 className='is-size-4 has-text-centered has-text-weight-bold '>{article.title}</h2>
                </div>
                <hr className='mt-2 mb-4'/>
                <div className="media ">
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

                <div className="content content-perso is-flex is-flex-direction-column">
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
                  <div className="mt-auto is-flex is-align-items-center">
                    <p className='m-0 is-size-3'>{(+article.price).toFixed(2)} €</p>
                    <div className='ml-auto is-flex is-align-items-center'>

                    {panier.length > 0 && panier.map((el, index) => (
                      el.id === article.id && (
                        <div className="is-flex is-align-items-center" key={index}>
                          <div className='button is-link is-rounded btn-moins' onClick={() => decreaseProduct(article)}>-</div>
                          <div className='mx-2'>{el.count}</div>
                        </div>
                      )
                    ))}
                      <div className='button is-link is-rounded btn-plus' onClick={() => addProduct(article)}>+</div>
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

  console.log('articles', articlesList)

  return {
    props: {
      articlesList
    }
  }
}
