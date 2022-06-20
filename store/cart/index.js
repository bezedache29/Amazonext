import { action } from "easy-peasy";

export const cartStore = {

  cartList: [],
  cartCount: 0,
  total: 0,
  address: {},

  loadCount: action((state, payload) => {
    state.cartCount = payload
  }),
  incrementCartCount: action((state, payload) => {
    state.cartCount += 1
  }),
  decrementCartCount: action((state, payload) => {
    state.cartCount -= 1
  }),
  loadCart: action((state, payload) => {
    state.cartList = payload
  }),
  addTotal: action((state, payload) => {
    state.total = payload
  }),
  loadAddress: action((state, payload) => {
    state.address = payload
  })

};