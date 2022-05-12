import '../styles/globals.css'
import 'bulma/css/bulma.min.css'
import Container from '../components/Container/ContainerApp'

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
