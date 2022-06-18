export default function useLocalStorage() {

  // Ajoute le panier au localstorage
  const addCartToLocalStorage = (cart) => {
    if (localStorage.getItem('cart')) {
      localStorage.removeItem('cart')
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  // Ajoute le total au localstorage
  const addTotalToLocalstorage = (total) => {
    if (localStorage.getItem('total')) {
      localStorage.removeItem('total')
    }
    localStorage.setItem('total', total)
  }

  return {
    addCartToLocalStorage,
    addTotalToLocalstorage
  }
}
