import { createStore } from 'easy-peasy';
import { cartStore } from './cart';
import { userStore } from './user';


const globalModel = {
  cart: cartStore,
  user: userStore
};

const GlobalStore = createStore(globalModel);
export default GlobalStore;