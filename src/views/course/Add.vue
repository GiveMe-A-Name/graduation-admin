<template>
  <div class="add_container">
    <h1>新增课程</h1>
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
      <el-button type="primary" plain @click="handleSave">新增</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import useCloseTag from '@/hooks/useCloseTag'
import { post } from '@/api/request'

export default defineComponent({
  setup() {
    const { closeTag } = useCloseTag()
    const course = reactive({
      title: '',
      teacher: '',
      content: '',
      type: '',
      tag: 'video',
    })
    const handleSave = async () => {
      const url = '/courses/create'
      const response = await post(url, course)
      if (response.errcode === 0) {
        closeTag.value({ reload: true })
      } else {
        window.alert('新增失败')
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
