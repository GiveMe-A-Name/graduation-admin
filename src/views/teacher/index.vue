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
        @click="$router.push('/teacher/add')"
      >
        添加一条
      </el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #operate="scope">
      <el-button
        size="mini"
        type="primary"
        @click="$router.push(`/teacher/edit/${scope.row.id}`)"
      >
        编辑
      </el-button>
      <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
        删除1
      </el-button>
    </template>
  </pro-table>
</template>

<script>
import { get, post } from '@/api/request'
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  name: 'teacherList',
  setup() {
    const teachers = reactive([])
    async function getTeachers() {
      const url = '/teachers'
      const response = await get(url)
      if (response.errcode === 0) {
        teachers.push(...response.data)
      }
    }
    getTeachers()
    const state = reactive({
      // 表格列配置，大部分属性跟el-table-column配置一样
      columns: [
        { label: '序号', type: 'index' },
        { label: '教师名称', prop: 'name', sortable: true, width: 180 },
        { label: '教师类型', prop: 'type' },
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
                list: teachers.slice((current - 1) * size, current * size),
                total: teachers.length,
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
      const url = '/teachers/delete'
      const response = await post(url, {
        id,
      })
      if (response.errcode === 0) {
        const deleteIndex = teachers.findIndex(teacher => teacher.id === id)
        teachers.splice(deleteIndex, 1)
        table.value.refresh()
      } else {
        window.alert('删除失败')
      }
    }

    return { ...toRefs(state), refresh, table, handleDelete }
  },
})
</script>
