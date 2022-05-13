import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

const logo = require('../../assets/icons/logo.png')

export default function Navbar() {

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

            <a className="navbar-item">
              Other
            </a>

            <Menu className="navbar-item">
              <MenuButton className="navbar-link">
                Articles
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

            {/* <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                
              </a>

              <div className="navbar-dropdown">
                <Link href={'/articles'}>
                  <a className="navbar-item">
                    Tous
                  </a>
                </Link>
                
                <a className="navbar-item">
                  Ordinateurs
                </a>
                <a className="navbar-item">
                  Voitures
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Autre
                </a>
              </div>
            </div> */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link href={'/auth/register'}>
                  <a className="button is-primary">
                    <strong>S'enregistrer</strong>
                  </a>
                </Link>
                <a className="button is-light">
                  Se connecter
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
