const Layout = () => import('@/layout/index.vue')
const TeacherList = () => import('@/views/teacher/index.vue')
const Add = () => import('@/views/teacher/Add.vue')
const Edit = () => import('@/views/teacher/Edit.vue')

export default [
  {
    path: '/teacher',
    component: Layout,
    name: 'teacher',
    meta: {
      title: '教师管理',
    },
    icon: 'el-icon-school',
    children: [
      {
        path: '',
        name: 'teacherList',
        component: TeacherList,
        meta: {
          title: '教师列表',
        },
      },
      {
        path: 'add',
        name: 'teacherAdd',
        component: Add,
        meta: {
          title: '教师添加',
        },
        hidden: true, // 不在菜单中显示
      },
      {
        path: 'edit/:id',
        name: 'teacherEdit',
        component: Edit,
        meta: {
          title: '教师编辑',
        },
        hidden: true, // 不在菜单中显示
      },
    ],
  },
]
