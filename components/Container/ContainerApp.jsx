import React from 'react'
import Navbar from '../Navbar/NavbarApp'

export default function Container({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}