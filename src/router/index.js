import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/Views/HomeView.vue'
import LoginView from '@/components/Views/LoginView.vue'
import CadastroView from '@/components/Views/CadastroView.vue'
import MeusEventosView from '@/components/Views/MeusEventosView.vue'
import PerfilView from '@/components/Views/PerfilView.vue'
import TrocarSenhaView from '@/components/Views/TrocarSenhaView.vue'
import NovoEventoView from '@/components/Views/NovoEventoView.vue'
import NoticiasView from '@/components/Views/NoticiasView.vue'
import NoticiaView from '@/components/Views/NoticiaView.vue'
import NovaNoticiaView from '@/components/Views/NovaNoticiaView.vue'

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
  },
  {
    path: '/cadastrar',
    name: 'cadastro',
    component: CadastroView,
    meta: { hideHeader: true }
  },
  {
    path: '/trocar-senha',
    name: 'trocarSenha',
    component: TrocarSenhaView,
    meta: { hideHeader: true }
  },
  {
    path: '/meus-eventos',
    name: 'meusEventos',
    component: MeusEventosView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  },
  {
    path: '/novo-evento',
    name: 'novoEvento',
    component: NovoEventoView
  },
  {
    path: '/noticias',
    name: 'noticias',
    component: NoticiasView
  },
  {
    path: '/noticia/:id?',
    name: 'noticia',
    component: NoticiaView
  },
  {
    path: '/noticias/:id',
    name: 'noticiaLegacy',
    component: NoticiaView
  },
  {
    path: '/nova-noticia',
    name: 'novaNoticia',
    component: NovaNoticiaView
  }
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router