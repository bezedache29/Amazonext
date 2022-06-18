import { createStore } from 'easy-peasy';
import { cartStore } from './cart';


const globalModel = {
  cart: cartStore
};

const GlobalStore = createStore(globalModel);
export default GlobalStore;