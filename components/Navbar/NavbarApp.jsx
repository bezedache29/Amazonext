import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { Avatar, Menu, MenuButton, MenuItem, MenuList, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react'
import { checkCookies, removeCookies } from 'cookies-next'
import ModalApp from '../Modal/ModalApp'

const logo = require('../../assets/icons/logo.png')

export default function Navbar() {

  const [isConnected, setIsConnected] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    checkCookies('jwt') ? setIsConnected(true) : setIsConnected(false)
  })

  const logout = () => {
    onClose()
    removeCookies('jwt')
    // Dispatch le user a vide
  }

  return (
    <>
      <nav className="navbar is-fixed-top pl-6" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className='is-flex is-flex-direction-column is-justify-content-center is-align-items-center'>
            <Image src={logo} width="112" height="50" />
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
              <a className="navbar-item">
                Ajouter un article
              </a>
            )}

          </div>

          <div className="navbar-end">
            {isConnected ? (
              <div className="mt-2 mr-3">
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
