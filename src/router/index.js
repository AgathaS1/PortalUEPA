import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/Views/HomeView.vue'
import LoginView from '@/components/Views/LoginView.vue'

const routes = [
  {
    path: '/',            
    name: 'home',
    component: HomeView,
    meta: { hideHeader: false }    
  },
  {
  path: '/login',            
    name: 'login',
    component: LoginView,
    meta: { hideHeader: true }    
  }
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router