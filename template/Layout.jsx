import React from 'react'
import HeadApp from '../components/Head/HeadApp'
import Navbar from '../components/Navbar/NavbarApp'

export default function Layout({ children, head, display = '' }) {
  return (
    <>
      <HeadApp title={head} />
      <Navbar />
      <div className={`mt-6 container ${display}`}>
        {children}
      </div>
    </>
  )
}
