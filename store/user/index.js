import { action } from "easy-peasy";

export const userStore = {

  user: {},

  loadUser: action((state, payload) => {
    state.user = payload
  })

};