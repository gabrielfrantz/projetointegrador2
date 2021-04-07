import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Curso from '@/components/Curso'
import Perfil from '@/components/Perfil'
import CriarCurso from '@/components/CriarCurso'
import EditarCurso from '@/components/EditarCurso'
import ViewCurso from '@/components/ViewCurso'
import CriarModulo from '@/components/CriarModulo'
import EditarModulo from '@/components/EditarModulo'
import CriarAula from '@/components/CriarAula'
import EditarAula from '@/components/EditarAula'
import ViewAula from '@/components/ViewAula'
import HomeAluno from '@/components/HomeAluno'
import HomeVisitante from '@/components/HomeVisitante'
import Log from '@/components/Log'
import ViewLog from '@/components/ViewLog'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/home/aluno',
      name: 'home-aluno',
      component: HomeAluno
    },
    {
      path: '/home/visitante',
      name: 'home-visitante',
      component: HomeVisitante
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
      path: '/view/curso',
      name: 'view-curso',
      component: ViewCurso
    },
    {
      path: '/criar/modulo',
      name: 'criar-modulo',
      component: CriarModulo
    },
    {
      path: '/editar/modulo',
      name: 'editar-modulo',
      component: EditarModulo
    },
    {
      path: '/criar/aula',
      name: 'criar-aula',
      component: CriarAula
    },
    {
      path: '/editar/aula',
      name: 'editar-aula',
      component: EditarAula
    },
    {
      path: '/view/aula',
      name: 'view-aula',
      component: ViewAula
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: Perfil
    },
    {
      path: '/log',
      name: 'log',
      component: Log
    },
    {
      path: '/view/log',
      name: 'view-log',
      component: ViewLog
    }
  ]
})
