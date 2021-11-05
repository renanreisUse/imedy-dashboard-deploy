import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import Paciente from 'src/components/Dashboard/Views/Usuarios/Paciente/PacientePage.vue'
import PacienteProfile from 'src/components/Dashboard/Views/Usuarios/Paciente/PacienteProfile.vue'
import Profissional from 'src/components/Dashboard/Views/Usuarios/Profissional/ProfissionalPage.vue'
import ProfissionalProfile from '../components/Dashboard/Views/Usuarios/Profissional/ProfissionalProfile.vue'

// Forms pages
import RegularForms from 'src/components/Dashboard/Views/Forms/RegularForms.vue'
import ExtendedForms from 'src/components/Dashboard/Views/Forms/ExtendedForms.vue'
import ValidationForms from 'src/components/Dashboard/Views/Forms/ValidationForms.vue'
import Wizard from 'src/components/Dashboard/Views/Forms/Wizard.vue'

// TableList pages
import RegularTables from 'src/components/Dashboard/Views/Tables/RegularTables.vue'
import ExtendedTables from 'src/components/Dashboard/Views/Tables/ExtendedTables.vue'
import PaginatedTables from 'src/components/Dashboard/Views/Tables/PaginatedTables.vue'

// Charts
import Charts from 'src/components/Dashboard/Views/Charts.vue'


let formsMenu = {
  path: '/forms',
  component: DashboardLayout,
  redirect: '/forms/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Forms',
      component: RegularForms
    },
    {
      path: 'extended',
      name: 'Extended Forms',
      component: ExtendedForms
    },
    {
      path: 'validation',
      name: 'Validation Forms',
      component: ValidationForms
    },
    {
      path: 'wizard',
      name: 'Wizard',
      component: Wizard
    }
  ]
}

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      component: RegularTables
    },
    {
      path: 'extended',
      name: 'Extended Tables',
      component: ExtendedTables
    },
    {
      path: 'paginated',
      name: 'Paginated Tables',
      component: PaginatedTables
    }]
}

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
}

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register
}

let usuariosPage = {
  path: '/usuarios',
  component: DashboardLayout,
  redirect: '/usuarios/',
  children: [
    {
      path: 'paciente',
      name: 'Paciente',
      component: Paciente
    },
    {
      path: 'profissional',
      name: 'Profissional',
      component: Profissional
    },
    {
      path: 'profile/:id',
      name: 'Perfil Profissional',
      component: ProfissionalProfile
    },
    {
      path: 'profile2/:id',
      name: 'Perfil Paciente',
      component: PacienteProfile
    }
  ]
}

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      }
    ]
  },
  usuariosPage,
  formsMenu,
  tablesMenu,
  loginPage,
  registerPage,
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      }
    ]
  },
  {path: '*', component: NotFound}
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
