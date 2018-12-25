// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import firebase from 'firebase'
import Login from './pages/Login'
import Register from './pages/Register'
import Tchat from './pages/Tchat'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    component: Tchat,
    beforeEnter: (to, from, next) => {
      if(!firebase.auth().currentUser) {
        next('/login')
      }else {
        next()
      }
    }
  }
]

const router = new VueRouter({routes})

// Initialize Firebase
let config = {
  apiKey: "AIzaSyCExLTwtr3Ei3w1Anz5p0y-JyfvG7e9RVM",
  authDomain: "team-collaborative-app.firebaseapp.com",
  databaseURL: "https://team-collaborative-app.firebaseio.com",
  projectId: "team-collaborative-app",
  storageBucket: "team-collaborative-app.appspot.com",
  messagingSenderId: "1032382393181"
};
firebase.initializeApp(config);

window.firebase =firebase

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  
  store.dispatch('setUser', user)
  
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    store
  })

  unsubscribe()
})



