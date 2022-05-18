<template>
  <div class="add_container">
    <h1>编辑课程</h1>
    <div class="input">
      <p>课程名称:</p>
      <el-input v-model="course.title" placeholder="请填写" />
    </div>
    <div class="input">
      <p>课程教师:</p>
      <el-input v-model="course.teacher" placeholder="请填写" />
    </div>
    <div class="input">
      <p>课程内容:</p>
      <el-input
        v-model="course.content"
        :rows="3"
        type="textarea"
        placeholder="请填写"
      />
    </div>
    <div class="input">
      <p>课程类型:</p>
      <el-input v-model="course.type" placeholder="请填写" />
    </div>
    <div class="input">
      <p>课程标签：</p>
      <el-radio v-model="course.tag" label="video">视频</el-radio>
      <el-radio v-model="course.tag" label="text">文章</el-radio>
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useCloseTag from '@/hooks/useCloseTag'
import { useRoute } from 'vue-router'
import { get, post } from '@/api/request'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { id } = route.params
    const { closeTag } = useCloseTag()
    const course = ref({
      title: '',
      teacher: '',
      content: '',
      type: '',
      tag: '',
    })

    async function getTeacher() {
      const url = `/courses/admin/${id}`
      const response = await get(url)
      if (response.errcode === 0) {
        course.value = response.data
      }
    }
    getTeacher()

    const handleSave = async () => {
      const url = '/courses/update'
      const data = {
        id,
        ...course.value,
      }
      const response = await post(url, data)
      if (response.errcode === 0) {
        closeTag.value({ reload: true })
      } else {
        window.alert('保存失败')
      }
    }
    return {
      course,
      handleSave,
    }
  },
})
</script>
<style scoped lang="scss">
.add_container {
  padding: 0 50px;
  > h1 {
    font-size: 25px;
    font-weight: bolder;
    color: #000;
  }
  > .input {
    p {
      font-weight: bold;
    }
    margin-top: 20px;
  }
  > .btn {
    margin-top: 20px;
  }
}
</style>
