// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import firebase from 'firebase'
import Login from './pages/Login'
import Register from './pages/Register'
import Tchat from './pages/Tchat'

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
    component: Tchat
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
