import React from 'react'
import Navbar from '../Navbar/NavbarApp'
import { ChakraProvider } from '@chakra-ui/react'

export default function Container({ children }) {
  return (
    <ChakraProvider>
      <Navbar />
      {children}
    </ChakraProvider>
  )
}