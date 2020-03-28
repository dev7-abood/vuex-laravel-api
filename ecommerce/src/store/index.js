import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products : [],
    product : {},
    cart : [],
    notifications : []
  },
  mutations: {
    SET_PRODUCTS(state , products){
        state.products = products
    },
    SET_PRODUCT(state ,product)
    {
        state.product = product
    },
     ADD_TO_CART(state , {product , quantity}){
        let productInCart = state.cart.find(item => {
         return item.product.id === product.id
        });
        if (productInCart)
        {
            productInCart.quantity += quantity;
            return;
        }
        state.cart.push({product , quantity})
     },
      SET_CART(state , cartItems){
        state.cart = cartItems;
      },
      REMOVE_PRODUCT_FROM_CART(state , product){
        state.cart = state.cart.filter(item => {
            return item.product.id !== product.id
        })
      },
      CLEAR_CART_ITEMS(state){
          state.cart = []
      },
      PUSH_NOTIFICATION(state , notification){
          state.notifications.push({
              ...notification,
              id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
          })
      },
      REMOVE_NOTIFICATION(state , notificationToRemove){
          state.notifications = state.notifications.filter(function (notification) {
              return notification.id !== notificationToRemove.id;
          })
      }

  },
  actions: {
    getProducts({commit})
    {
      axios.get('http://127.0.0.1:8000/api/products')
          .then(res => {
            commit('SET_PRODUCTS' , res.data)
          })
    },
    getProduct({commit} , productId)
    {
      axios.get(`http://127.0.0.1:8000/api/products/${productId}`)
          .then(res => {
            commit('SET_PRODUCT' , res.data)
          })
    },
      addProductToCart({commit , dispatch} , {product , quantity}){
        commit('ADD_TO_CART' , {product , quantity});
          dispatch('addNotification' , {
             type : 'success',
              message : 'Product add to cart'
          });
          axios.post('http://127.0.0.1:8000/api/cart' , {
              product_id : product.id,
              quantity
          })
      },
      getCartItem({commit}){
        axios.get('http://127.0.0.1:8000/api/cart')
            .then(res => {
                commit('SET_CART' , res.data)
            })
      },
      removeProductFromCart({commit} , product){
        commit('REMOVE_PRODUCT_FROM_CART' , product);
          axios.delete(`http://127.0.0.1:8000/api/cart/${product.id}`);
      },
      clearCartItems({commit}){
          commit('CLEAR_CART_ITEMS');
          axios.delete(`http://127.0.0.1:8000/api/cart`);
      },
      addNotification({commit} , notification){
            commit('PUSH_NOTIFICATION' , notification)
      },
      removeNotification({commit} , notification){
          commit('REMOVE_NOTIFICATION' , notification)
      }

  },
    getters : {
        cartItemCount(state){
          return state.cart.length
        },
        cartTotalPrice(state){
            let total = 0;

            state.cart.forEach(item => {
               total +=  item.product.price * item.quantity
            });
            return total
        }
    },
  modules: {
  }

})
