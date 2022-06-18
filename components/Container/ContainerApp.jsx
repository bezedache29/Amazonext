import React from 'react'
import Navbar from '../Navbar/NavbarApp'
import { ChakraProvider } from '@chakra-ui/react'
import GlobalStore from '../../store/store'
import { StoreProvider } from 'easy-peasy'

export default function Container({ children }) {
  return (
    <StoreProvider store={GlobalStore}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </StoreProvider>
  )
}