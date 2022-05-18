const Layout = () => import('@/layout/index.vue')
const CourseList = () => import('@/views/course/index.vue')
const Add = () => import('@/views/course/Add.vue')
const Edit = () => import('@/views/course/Edit.vue')
/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-21 09:18:32
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-07-26 16:30:58
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */

export default [
  {
    path: '/course',
    component: Layout,
    name: 'course',
    meta: {
      title: '课程管理',
    },
    icon: 'el-icon-monitor',
    children: [
      {
        path: '',
        name: 'courseList',
        component: CourseList,
        meta: {
          title: '课程列表',
        },
      },
      {
        path: 'add',
        name: 'courseAdd',
        component: Add,
        meta: {
          title: '课程添加',
        },
        hidden: true, // 不在菜单中显示
      },
      {
        path: 'edit/:id',
        name: 'courseEdit',
        component: Edit,
        meta: {
          title: '课程编辑',
        },
        hidden: true, // 不在菜单中显示
      },
    ],
  },
]
