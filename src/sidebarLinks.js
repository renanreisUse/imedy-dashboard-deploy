export default [
  {
    name: 'Visão Geral',
    icon: 'ti-panel',
    path: '/admin/overview'
  },
  {
    name: 'Usuários',
    icon: 'ti-user',
    children: [{
      name: 'Profissional',
      path: '/usuarios/profissional',
    },
    {
      name: 'Paciente',
      path: '/usuarios/paciente'
    }]
  },
  {
    name: 'Banner',
    icon: 'ti-rocket',
    path: '/banner/list'
  },
  {
    name: 'Notificações',
    icon: 'ti-bell',
    path: '/notifications/list'
  },
  {
    name: 'Administrador',
    icon: 'ti-user',
    path: '/admin/list'
  },
  /*
  {
    name: 'Usuários',
    icon: 'ti-user',
    children: [{
      name: 'Profissional',
      path: '/usuarios/profissional'
    },
    {
      name: 'Paciente',
      path: '/usuarios/paciente'
    }]
  },
  
  {
    name: 'Notificações',
    icon: 'ti-bell',
    path: '/table-list/regular'
  },
 
  {
    name: 'Suporte',
    icon: 'ti-settings',
    children: [{
      name: 'Profissional',
      path: '/components/buttons'
    },
    {
      name: 'Paciente',
      path: '/components/grid-system'
    }]
  } */
]
