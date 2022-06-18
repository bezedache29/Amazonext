import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import GlobalStore from '../../store/store'
import { StoreProvider } from 'easy-peasy'

export default function Container({ children }) {

  const Menu = {
    baseStyle: {
      menu: {},
      item: {
        maxW: '500px'
      },
    }
  }
  
  const theme = extendTheme({
    components: {
      Menu
    },
  })

  return (
    <StoreProvider store={GlobalStore}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </StoreProvider>
  )
}