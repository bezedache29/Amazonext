import React, { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useRouter } from 'next/router';
import HeaderApp from '../../components/Head/HeadApp.jsx'
import { useToast } from '@chakra-ui/react'
import useLocalStorage from '../../hooks/useLocalStorage'
import Link from 'next/link.js';

export default function Cart() {

  const router = useRouter()

  const toast = useToast()

  const cartActions = useStoreActions((actions) => actions.cart)
  const cartStore = useStoreState((state) => state.cart)
  const cartCount = cartStore.cartCount
  const cart = cartStore.cartList
  const total = cartStore.total

  const [totalCart, setTotalCart] = useState(total)

  // HOOKS
  const { addCartToLocalStorage, addTotalToLocalstorage } = useLocalStorage()

  /**
   * Permet de vérifier que le user a bien un panier non vide
   * Si vide on le redirige vers la liste des articles
   */
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/articles')
    } else {
      let total = 0
      let count = 0
      cart.forEach(article => {
        total += +article.price
        count += +article.count
      })
      addTotalToLocalstorage(total.toFixed(2))
      cartActions.addTotal(total.toFixed(2))
      cartActions.loadCount(count)
      setTotalCart(total.toFixed(2))
    }
  }, [cart])

   /**
   * Permet d'ajouter un produit au panier
   */
    const addProduct = (article => {
      const newPanier = [...cart]
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
                price: (+article.priceUnity + +el.price).toFixed(2),
                priceUnity: (+article.priceUnity).toFixed(2),
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
              price: (+article.priceUnity).toFixed(2),
              priceUnity: (+article.priceUnity).toFixed(2),
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
            price: (+article.priceUnity).toFixed(2),
            priceUnity: (+article.priceUnity).toFixed(2),
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
    })

  const decreaseProduct = (article) => {
    const newPanier = [...cart]
    newPanier.forEach((el, i) => {
      if (el.id === article.id) {
        if ((el.count - 1) === 0) {
          newPanier.splice(i, 1)
        } else {
          const data = {
            id: article.id,
            title: article.title,
            price: (+el.price - +article.priceUnity).toFixed(2),
            priceUnity: (+article.priceUnity).toFixed(2),
            image: article.image,
            from: article.userName,
            quantity: article.quantity,
            count: el.count - 1
          }
          console.log('el.price', +el.price)
          console.log('article', +article.priceUnity)
          console.log('price', (+el.price - +article.priceUnity).toFixed(2))
          newPanier.splice(i, 1, data)
        }
      }
    })
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
  }

  const resetCart = () => {
    cartActions.loadCount(0)
    cartActions.loadCart([])
    cartActions.addTotal(0)
    localStorage.removeItem('cart')
    localStorage.removeItem('total')
    localStorage.setItem('resetCart', true)
    router.push('/articles')
  }

  return (
    <>
      <HeaderApp title='Panier' />
      <h1 className="mt-2 has-text-centered is-size-1 has-text-weight-bold">Votre panier</h1>

      <div className="container my-5">
        <h3 className="my-5 is-size-4">Vous avez actuellement <span className="has-text-weight-bold">{cartCount}</span> articles dans votre panier | <span className='is-size-6 is-underlined cursor-pointer has-text-link' onClick={resetCart}>Vider le panier</span></h3>
        <div className='columns'>
          <div className="column is-three-quarters">
            {cart.map(article => (
              <div className="box" key={article.id}>
                <article className="media is-flex is-align-items-center">
                  <div className="media-left">
                    <figure className="image image-cart">
                      <img src={`../../images/articles/${article.image}`} className="img-cart" alt="Image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content is-flex is-align-items-center">
                      <div className="column is-two-thirds">
                        <p className="m-0 is-size-7">De {article.from}</p>
                        <p className="m-0 is-size-7">Prix unitaire : {article.priceUnity} €</p>
                        <p className="m-0 is-size-5">{article.title}</p>
                      </div>
                      <div className="column is-flex is-align-items-center">
                        <div className="is-flex is-align-items-center">
                          <div className='is-flex is-align-items-center'>

                          {cart.length > 0 && cart.map((el, index) => (
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
                        <p className="m-0 ml-auto is-size-5 has-text-weight-bold">{article.price} €</p>
                      </div>
                      
                    </div>
                  </div>
                </article>
              </div>
            ))}
            
          </div>
          <div className="column">
            <div className="box is-flex is-flex-direction-column">
              <p className='has-text-centered	is-size-5 mb-3'>Sous-Total : <span className='is-size-4 has-text-weight-bold'>{totalCart} €</span></p>
              <Link href='/deliveries'>
                <button className="button is-link">Passer la commande</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
