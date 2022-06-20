import { useStoreActions, useStoreState } from 'easy-peasy'
import Link from 'next/link.js'
import React, { useEffect, useState } from 'react'
import HeaderApp from '../../components/Head/HeadApp.jsx'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import { v4 as uuidv4 } from 'uuid'
import CheckoutForm from './component/CheckoutForm.jsx'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function summary() {

  const [clientSecret, setClientSecret] = useState("");

  const cartActions = useStoreActions((actions) => actions.cart)
  const cartStore = useStoreState((state) => state.cart)
  const cart = cartStore.cartList
  const total = cartStore.total
  const address = cartStore.address

  const order = {
    id: uuidv4(),
    total,
    address,
    cart
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  useEffect(() => {
    const cartStorage = localStorage.getItem('cart')
    const cartTotalStorage = localStorage.getItem('total')
    const addressStorage = localStorage.getItem('address')
    if (cartStorage) {
      cartActions.loadCart(JSON.parse(cartStorage))
      cartActions.addTotal(cartTotalStorage)
      cartActions.loadAddress(JSON.parse(addressStorage))
    }
  }, [])

  const goToStripe = async () => {
    const formdata = new FormData()
    formdata.append('id', uuidv4())
    formdata.append('total', Number(total))
    formdata.append('address', address)
    formdata.append('cart', cart)

    try {
      const res = await fetch(`${process.env.REACT_APP_URL_API}/stripe/checkout_sessions`, {
        method: 'POST',
        body: formdata
      })
      const response = await res.json()
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <HeaderApp title='Panier' />
      <h1 className="mt-2 has-text-centered is-size-1 has-text-weight-bold">Votre panier</h1>

      <div className="container my-5">
        <div className='columns'>
          <div className="column is-three-quarters mt-3">
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
                        <p className="m-0 ml-auto is-size-5 has-text-weight-bold">{article.price} €</p>
                      </div>
                      
                    </div>
                  </div>
                </article>
              </div>
            ))}
            
          </div>
          <div className="column is-flex is-flex-direction-column">
            <div className="column">
              {/* <div className="box is-flex is-flex-direction-column">
                <p className='has-text-centered	is-size-5 mb-3'>Sous-Total : <span className='is-size-4 has-text-weight-bold'>{total} €</span></p>
                <input type="hidden" value={total} name="total" />
                <button className="button is-link" onClick={goToStripe}>Valider et Payer</button>
              </div> */}
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </div>
            <div className="column">
            <div className="box is-flex is-flex-direction-column">
              <p className='has-text-centered	is-size-5 mb-3 has-text-weight-bold'>Adresse de livraison</p>
              <p className="is-size-5 is-italic">{address.name}</p>
              <p>{address.firstname} {address.lastname}</p>
              <p>{address.address}</p>
              <p>{address.zipCode} {address.city}</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
