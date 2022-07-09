import Layout from '@/layout/index'

const dataRouter = {
  path: '/platform/data',
  component: Layout,
  redirect: '/platform/data/list',
  name: 'DataManagement',
  meta: { title: '数据采集', breadcrumb: false, icon: 'drag' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/data/list'),
      name: 'DataManagementList',
      meta: { title: '数据采集' }
    },
    {
      path: 'create',
      component: () => import('@/views/data/create'),
      name: 'DataManagementCreate',
      meta: { title: '基本信息', activeMenu: '/platform/data/list' },
      hidden: true
    },
    {
      path: ':id/base',
      component: () => import('@/views/data/base'),
      name: 'DataManagementBase',
      meta: { title: '基本信息', activeMenu: '/platform/data/list' },
      hidden: true
    },
    {
      path: ':id/land',
      component: () => import('@/views/data/land'),
      name: 'DataManagementLand',
      meta: { title: '地貌和土壤信息', activeMenu: '/platform/data/list' },
      hidden: true
    },
    {
      path: ':id/type',
      component: () => import('@/views/data/type'),
      name: 'DataManagementType',
      meta: { title: '类别详情', activeMenu: '/platform/data/list' },
      hidden: true
    }
  ]
}

export default dataRouter
