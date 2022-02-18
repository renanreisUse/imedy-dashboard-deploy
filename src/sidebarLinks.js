export default [
  {
    name: 'Visão Geral',
    icon: 'ti-panel',
    path: '/admin/overview',
    permission: ['MANAGER', 'REGISTER', 'EDITOR']
  },
  {
    name: 'Usuários',
    icon: 'ti-user',
    permission: ['MANAGER', 'REGISTER', 'EDITOR'],
    children: [{
      name: 'Profissional',
      path: '/usuarios/profissional',
      permission: ['MANAGER', 'REGISTER', 'EDITOR'],
    },
    {
      name: 'Paciente',
      path: '/usuarios/paciente',
      permission: ['MANAGER', 'EDITOR']
    }]
  },
  {
    name: 'Banner',
    icon: 'ti-rocket',
    path: '/banner/list',
    permission: ['MANAGER', 'EDITOR']
  },
  {
    name: 'Notificações',
    icon: 'ti-bell',
    path: '/notifications/list',
    permission: ['MANAGER', 'EDITOR']
  },
  {
    name: 'Administrador',
    icon: 'ti-user',
    path: '/admin/list',
    permission: ['MANAGER', 'EDITOR']
  },
]
