import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Book from './components/Book.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/:id',
          component: Book,
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
