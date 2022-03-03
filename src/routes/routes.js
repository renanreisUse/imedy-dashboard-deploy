import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Pages
import Overview from 'src/components/Dashboard/Views/Dashboard/Overview.vue'
import Login from 'src/components/Dashboard/Views/Pages/Login.vue'
import Register from 'src/components/Dashboard/Views/Pages/Register.vue'
import UpdatePassword from 'src/components/Dashboard/Views/Pages/UpdatePassword.vue'
import UpdateManagerPassword from 'src/components/Dashboard/Views/Pages/UpdateManagerPassword.vue'
import Paciente from 'src/components/Dashboard/Views/Usuarios/Paciente/PacientePage.vue'
import PacienteProfile from 'src/components/Dashboard/Views/Usuarios/Paciente/PacienteProfile.vue'
import Profissional from 'src/components/Dashboard/Views/Usuarios/Profissional/ProfissionalPage.vue'
import ProfissionalProfile from '../components/Dashboard/Views/Usuarios/Profissional/ProfissionalProfile.vue'
import BatchUsers from 'src/components/UIComponents/BatchUsers.vue'
import PushNotifications from 'src/components/Dashboard/Views/Notifications/PushNotifications.vue'
import CreateNotification from 'src/components/Dashboard/Views/Notifications/CreateNotification.vue'
import CreateAdmin from 'src/components/Dashboard/Views/Administrators/CreateAdmin.vue'
import ListAdmin from 'src/components/Dashboard/Views/Administrators/ListAdmin.vue'
import ProfileAdmin from 'src/components/Dashboard/Views/Administrators/ProfileAdmin.vue'
import ListBanners from 'src/components/Dashboard/Views/Banner/ListBanners.vue'
import CreateBanner from 'src/components/Dashboard/Views/Banner/CreateBanner.vue'
import MyProfile from 'src/components/Dashboard/Views/Pages/MyProfile.vue'
import CreateFaq from 'src/components/Dashboard/Views/Faq/CreateFaq.vue'
import ListFaq from 'src/components/Dashboard/Views/Faq/ListFaq.vue'
// Forms pages
import RegularForms from 'src/components/Dashboard/Views/Forms/RegularForms.vue'
import ExtendedForms from 'src/components/Dashboard/Views/Forms/ExtendedForms.vue'
import ValidationForms from 'src/components/Dashboard/Views/Forms/ValidationForms.vue'
import Wizard from 'src/components/Dashboard/Views/Forms/Wizard.vue'

// TableList pages
import RegularTables from 'src/components/Dashboard/Views/Tables/RegularTables.vue'
import ExtendedTables from 'src/components/Dashboard/Views/Tables/ExtendedTables.vue'
import PaginatedTables from 'src/components/Dashboard/Views/Tables/PaginatedTables.vue'

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

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register
}

let updatePassword = {
  path: '/auth/reset-password',
  name: '',
  component: UpdatePassword
}

let updateManagerPassword = {
  path: '/auth/reset-password/manager',
  name: '',
  component: UpdateManagerPassword
}

let notificationPage = {
  path: '/notifications',
  component: DashboardLayout,
  redirect: '/notifications/',
  children: [
    {
      path: 'list',
      name: 'Notificações',
      component: PushNotifications
    },
    {
      path: 'create',
      name: 'Criar Notificações',
      component: CreateNotification
    }]
}
let bannerPage = {
  path: '/banner',
  component: DashboardLayout,
  redirect: '/banner/',
  children: [
    {
      path: 'list',
      name: 'Promoções',
      component: ListBanners
    },
    {
      path: 'create',
      name: 'Criar Banner',
      component: CreateBanner
    }]
}

let usuariosPage = {
  path: '/usuarios',
  component: DashboardLayout,
  redirect: '/usuarios/',
  children: [
    {
      path: 'paciente',
      name: 'Pacientes',
      component: Paciente
    },
    {
      path: 'profissional',
      name: 'Visão Geral',
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
    },
    {
      path: 'batch',
      name: 'Profissionais',
      component: BatchUsers
    }
  ]
}

let myProfile = {
  path: '/my-profile',
  component: DashboardLayout,
  redirect: '/my-profile/',
  children: [
    {
      path: '',
      name: 'Meu Perfil',
      component: MyProfile
    }]
}

let faqPage = {
  path: '/faq',
  component: DashboardLayout,
  redirect: '/faq/',
  children: [
    {
      path: 'list/patient',
      name: 'Pacientes',
      component: ListFaq
    },
    {
      path: 'list/professional',
      name: 'Profissional',
      component: ListFaq
    },
    {
      path: 'create/:id',
      name: 'Criar Pergunta',
      component: CreateFaq
    }]
}

let adminPage = {
  path: '/admin',
  component: DashboardLayout,
  redirect: '/admin/',
  children: [
    {
      path: 'list',
      name: 'Administradores',
      component: ListAdmin
    },
    {
      path: 'create',
      name: 'Criar Administrador',
      component: CreateAdmin
    },
    {
      path: 'profile/:id',
      name: 'Administrador',
      component: ProfileAdmin
    }]
}
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  usuariosPage,
  formsMenu,
  tablesMenu,
  registerPage,
  notificationPage,
  updatePassword,
  updateManagerPassword,
  adminPage,
  bannerPage,
  myProfile,
  faqPage,
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Visão geral',
        component: Overview
      }
    ]
  },
  {path: '*', component: NotFound}
]

export default routes
