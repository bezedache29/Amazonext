import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NextImage from "next/image"
import { Avatar, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Icon, Badge, Image } from '@chakra-ui/react'
import { checkCookies, removeCookies } from 'cookies-next'
import ModalApp from '../Modal/ModalApp'
import { useStoreState } from 'easy-peasy'

const logo = require('../../assets/icons/logo.png')

export default function Navbar() {

  const [isConnected, setIsConnected] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const cartStore = useStoreState((state) => state.cart)
  const cartCount = cartStore.cartCount
  const cart = cartStore.cartList
  const total = cartStore.total

  useEffect(() => {
    checkCookies('jwt') ? setIsConnected(true) : setIsConnected(false)
  })

  const logout = () => {
    onClose()
    removeCookies('jwt')
  }

  const openCart = () => {
    if (cartCount === 0) {
      console.log('Panier vide')
    } else {
      console.log('Nb de produits dans le panier ' + cartCount)
    }
  }

  return (
    <>
      <nav className="navbar is-fixed-top pl-6" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className='is-flex is-flex-direction-column is-justify-content-center is-align-items-center'>
            <NextImage src={logo} width="112" height="50" />
          </div>
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link Link href={'/'}>
              <a className="navbar-item">
                Accueil
              </a>
            </Link>

            <Menu className="navbar-item">
              <MenuButton className="navbar-link">
                Boutique
              </MenuButton>
              <MenuList>
                <Link href={'/articles'}>
                  <MenuItem>Tous les articles</MenuItem>
                </Link>
                <hr className="navbar-divider" />
                <MenuItem>Ordinateurs</MenuItem>
                <MenuItem>Voitures</MenuItem>
                <MenuItem>Livres</MenuItem>
                <MenuItem>Meubles</MenuItem>
              </MenuList>
            </Menu>

            {isConnected && (
              <Link href={'/articles/create'}>
                <a className="navbar-item">
                  Ajouter un article
                </a>
              </Link>
            )}

          </div>

          <div className="navbar-end">
            {isConnected ? (
              <div className="mt-2 mr-3 is-flex is-full is-align-items-center">
                <Menu>
                  <MenuButton>
                  <div className="cart cursor-pointer" onClick={openCart}>
                    <Icon viewBox='0 0 24 24' stroke={cartCount > 0 ? "#3e56c4" : "currentColor"} className='mr-5' boxSize={10}>
                      <path strokeLinecap="round" fill={cartCount > 0 ? "#3e56c4" : "white"} strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </Icon>
                    {cartCount > 0 && (
                      <Badge variant='solid' colorScheme='red' className="badge">
                        {cartCount}
                      </Badge>
                    )}
                  </div>
                  </MenuButton>
                  <MenuList>
                  { cart.length > 0 ? cart.map(article => (
                    <MenuItem minH='48px'>
                      <div className="is-flex is-align-items-center w-100">
                        <div className="is-flex is-align-items-center">
                          <Image
                            src={article.image ? `../../images/articles/${article.image}` : 'https://bulma.io/images/placeholders/96x96.png'}
                            width="20px"
                            height="20px"
                            alt={article.image ? article.title : 'Image par defaut'}
                            boxSize='2rem'
                            borderRadius='full'
                            mr='12px'
                          />
                          <p className="mr-3 has-text-weight-bold">{article.count}</p>
                          <p className="mr-3">x</p>
                          <p className="m-0">{article.title}</p>
                        </div>
                        
                        <div className="ml-auto is-flex is-align-items-center">
                          <p className="mx-3">|</p>
                          <p className="m-0 has-text-weight-bold">{article.price} €</p>
                        </div>
                      </div>
                    </MenuItem>
                  )) : (
                    <MenuItem>Panier vide !</MenuItem>
                  )}
                  { cart.length > 0 && (
                    <>
                      <hr className="navbar-divider" />
                      <div className="is-flex is-justify-content-flex-end">
                        <p className="m-3 is-size-4 has-text-weight-bold">Total : {total} €</p>
                      </div>
                      <div className="is-flex is-justify-content-flex-end">
                        <button className="button is-link mr-3">Voir le panier</button>
                      </div>
                    </>
                  )}
                   
                  </MenuList>
                </Menu>
                
                <Menu>
                  <MenuButton>
                    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Voir mon profil</MenuItem>
                    <MenuItem>Voir mes commandes</MenuItem>
                    <MenuItem>Voir mes produits</MenuItem>
                    <hr className="navbar-divider" />
                    <MenuItem onClick={onOpen}>Se déconnecter</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <Link href={'/auth/register'}>
                    <a className="button is-primary">
                      <strong>S'enregistrer</strong>
                    </a>
                  </Link>
                  <Link href={'/auth/login'}>
                    <a className="button is-light">
                      Se connecter
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modal Logout */}
      <ModalApp isOpen={isOpen} onClose={onClose} logout={logout} />

    </>
  )
}
