import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">AmazoNext</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <Link href={'/'}><a className="nav-link">Accueil</a></Link>
              </li>
              <li className="nav-item">
                <Link href={'/articles'}><a className="nav-link">Articles</a></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
