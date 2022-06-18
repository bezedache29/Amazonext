import { action } from "easy-peasy";

export const cartStore = {

  cartList: [],
  cartCount: 0,

  addCart: action((state, payload) => {
    console.log(payload)
    state.cartList.push(payload);
  }),
  incrementCartCount: action((state, payload) => {
    state.cartCount += 1
  }),
  decrementCartCount: action((state, payload) => {
    state.cartCount -= 1
  }),

};