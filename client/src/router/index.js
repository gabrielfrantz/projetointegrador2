import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Curso from '@/components/Curso'
import Perfil from '@/components/Perfil'
import CriarCurso from '@/components/CriarCurso'
import EditarCurso from '@/components/EditarCurso'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cursos',
      name: 'cursos',
      component: Curso
    },
    {
      path: '/criar/curso',
      name: 'criar-curso',
      component: CriarCurso
    },
    {
      path: '/editar/curso',
      name: 'editar-curso',
      component: EditarCurso
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil
    }
  ]
})
