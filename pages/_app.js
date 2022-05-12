import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from '../components/Container/ContainerApp'

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
