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
      path: ':id/one',
      component: () => import('@/views/data/one'),
      name: 'DataManagementOne',
      meta: { title: '基本信息', activeMenu: '/platform/data/list' },
      hidden: true
    },
    {
      path: ':id/two',
      component: () => import('@/views/data/two'),
      name: 'DataManagementTwo',
      meta: { title: '地貌和土壤信息', activeMenu: '/platform/data/list' },
      hidden: true
    },
    {
      path: ':id/three',
      component: () => import('@/views/data/three'),
      name: 'DataManagementThree',
      meta: { title: '类别详情', activeMenu: '/platform/data/list' },
      hidden: true
    }
  ]
}

export default dataRouter
