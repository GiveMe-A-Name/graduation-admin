<template>
  <pro-table
    ref="table"
    title="列表"
    :request="getList"
    :columns="columns"
    :pagination="paginationConfig"
    @selectionChange="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/course/add')"
      >
        添加一条1
      </el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #operate="scope">
      <el-button
        size="mini"
        type="primary"
        @click="$router.push(`/course/edit/${scope.row.id}`)"
      >
        编辑
      </el-button>
      <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
        删除
      </el-button>
    </template>
  </pro-table>
</template>

<script>
import { get, post } from '@/api/request'
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  name: 'courseList',
  setup() {
    const courses = reactive([])
    async function getCourses() {
      const url = '/courses/admin/all'
      const response = await get(url)
      if (response.errcode === 0) {
        const data = response.data.map(item => {
          let tag = '未知类型'
          if (item.tag === 'video') {
            tag = '视频'
          } else if (item.tag === 'text') {
            tag = '文章'
          }
          return {
            ...item,
            pushTime: new Date(item.pushTime).toLocaleDateString(),
            tag,
          }
        })
        courses.push(...data)
      }
    }
    getCourses()
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { label: '序号', type: 'index' },
        { label: '课程名称', prop: 'title', sortable: true, width: 180 },
        { label: '课程类型', prop: 'tag' },
        { label: '课程老师', prop: 'teacher' },
        { label: '课程发布时间', prop: 'pushTime' },
        {
          label: '操作',
          width: 180,
          align: 'center',
          tdSlot: 'operate', // 自定义单元格内容的插槽名称
        },
      ],
      // 搜索配置
      // 分页配置
      paginationConfig: {
        layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
        pageSize: 2, // 每页条数
        pageSizes: [2, 4],
        style: { textAlign: 'left' },
      },
      selectedItems: [],
      batchDelete() {
        console.log(state.selectedItems)
      },
      // 选择
      handleSelectionChange(arr) {
        state.selectedItems = arr
      },
      // 请求函数
      async getList(params) {
        const { current, size } = params
        // params是从组件接收的，包含分页和搜索字段。
        const { data } = await new Promise(rs => {
          setTimeout(() => {
            rs({
              code: 200,
              data: {
                list: courses.slice((current - 1) * size, current * size),
                total: courses.length,
              },
            })
          }, 500)
        })
        // 必须要返回一个对象，包含data数组和total总数
        return {
          data: data.list,
          total: +data.total,
        }
      },
    })
    const table = ref(null)
    const refresh = () => {
      table.value.refresh()
    }
    const handleDelete = async id => {
      const url = '/courses/delete'
      const response = await post(url, {
        id,
      })
      if (response.errcode === 0) {
        const deleteIndex = courses.findIndex(teacher => teacher.id === id)
        courses.splice(deleteIndex, 1)
        table.value.refresh()
      } else {
        window.alert('删除失败')
      }
    }

    return { ...toRefs(state), refresh, table, handleDelete }
  },
})
</script>
