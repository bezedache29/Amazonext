import { useDisclosure } from '@chakra-ui/react'
import { checkCookies, getCookie } from 'cookies-next'
import { useStoreActions, useStoreState } from 'easy-peasy'
import React, { useState, useEffect } from 'react'
import HeaderApp from '../../components/Head/HeadApp.jsx'
import ModalAddress from '../../components/Modal/ModalAddress.jsx'
import { useRouter } from 'next/router';

const jwt = require('jsonwebtoken')

export default function Deliveries() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  const cartActions = useStoreActions((actions) => actions.cart)
  const userActions = useStoreActions((actions) => actions.user)
  const userStore = useStoreState((state) => state.user)
  const user = userStore.user

  console.log(user)

  const [addresses, setAddresses] = useState([])
  const [addressAdded, setAddressAdded] = useState(false)
  const [userPseudo, setUserPseudo] = useState('')

  const searchAdresses = async () => {
    const data = await fetch(`${process.env.REACT_APP_URL_API}/addresses/getAddressesUser?` + new URLSearchParams({
      userName: userPseudo
    }))
    const addresses = await data.json()
    setAddresses(addresses)
    console.log('addresses', addresses)
  }

  useEffect(() => {
    if (checkCookies('jwt')) {
      const decoded = jwt.decode(getCookie('jwt'), {complete: true})
      setUserPseudo(decoded.payload.user.pseudo)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(userPseudo).length > 0) {
      searchAdresses()
    }
  }, [userPseudo])

  useEffect(() => {
    if (addressAdded) {
      searchAdresses()
      setAddressAdded(false)
    }
  }, [addressAdded])

  const addAddress = () => {
    console.log('add address')
  }

  const addressSelected = (address) => {
    cartActions.loadAddress(address)
    localStorage.setItem('address', JSON.stringify(address))
    router.push('/cart/summary')
  }

  return (
    <>
      <HeaderApp title='Adresse de livraison' />
      <h1 className="mt-2 has-text-centered is-size-1 has-text-weight-bold">Adresse de livraison</h1>

      <div className="container my-5">
        <p className='my-5'>Sélectionnez ci-dessous l'adresse de votre choix en cliquant sur le bouton « Livrer à cette acdresse » correspondant ou <span className="is-underlined has-text-link cursor-pointer">entrez une nouvelle adresse.</span></p>

        { addresses.length > 0 ? addresses.map(address => (
          <div className="column is-one-quarter card-address my-2 is-flex is-flex-direction-column box" key={address.id}>
            <p className="has-background-primary has-text-light has-text-centered br-3 py-2 is-size-4 has-text-weight-bold">Title</p>
            <p className='mt-3'>{user.lastename} {user.firstname}</p>
            <p className='is-size-5'>{address.address}</p>
            <p className='mb-3 is-size-5'>{address.zipCode} {address.city}</p>
            <button className='button is-link mt-2 mb-1' onClick={() => addressSelected(address)}>Livrer a cette adresse</button>
            <button className='button is-danger mb-2 mt-1'>Supprimer cette adresse</button>
          </div>
        )) : (
          <div className='is-flex is-flex-direction-column is-align-content-center column is-half mx-auto box mt-80'>
            <p className="mb-3 is-size-4 has-text-centered">Vous n'avez pas encore enregistré d'adresse postale</p>
            <div className="column is-full is-flex is-justify-content-center">
              <button className="button is-link" onClick={onOpen}>Ajouter une adresse</button>
            </div>
          </div>
        )}
        
      </div>

      <ModalAddress isOpen={isOpen} userName={userPseudo} onClose={onClose} addAddress={addAddress} setAddressAdded={setAddressAdded} />
    </>
  )
}
