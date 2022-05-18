<template>
  <div class="add_container">
    <h1>新增教师</h1>
    <div class="input">
      <p>教师名称:</p>
      <el-input v-model="teacher.name" placeholder="请填写" />
    </div>
    <div class="input">
      <p>教师个人简介:</p>
      <el-input
        v-model="teacher.record"
        :rows="3"
        type="textarea"
        placeholder="请填写"
      />
    </div>
    <div class="input">
      <p>教师课程:</p>
      <el-input v-model="teacher.course" placeholder="请填写" />
    </div>
    <div class="input">
      <p>教师职称:</p>
      <el-input
        :rows="2"
        type="textarea"
        v-model="teacher.work"
        placeholder="请填写"
      />
    </div>
    <div class="input">
      <p>教师荣誉:</p>
      <el-input
        v-model="teacher.honor"
        :rows="3"
        type="textarea"
        placeholder="请填写"
      />
    </div>
    <div class="input">
      <p>教师类型:</p>
      <el-input v-model="teacher.type" placeholder="请填写" />
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="handleSave">保存</el-button>
      <el-button type="primary" plain @click="handleBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import useCloseTag from '@/hooks/useCloseTag'
import { useRoute } from 'vue-router'
import { get, post } from '@/api/request'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { id } = route.params
    const { closeTag } = useCloseTag()
    const teacher = reactive({
      name: '',
      record: '',
      course: '',
      work: '',
      honor: '',
      type: '',
    })

    async function getTeacher() {
      const url = `/teachers/${id}`
      const response = await get(url)
      if (response.errcode === 0) {
        const data = response.data
        teacher.name = data.name
        teacher.record = data.record
        teacher.course = data.pushcourse
        teacher.work = data.work
        teacher.honor = data.honor
        teacher.type = data.type
      }
    }
    getTeacher()

    const handleSave = async () => {
      const url = '/teachers/update'
      const data = {
        ...teacher,
        id,
      }
      const response = await post(url, data)
      if (response.errcode === 0) {
        closeTag.value({ reload: true })
      } else {
        window.alert('保存失败')
      }
    }

    const handleBack = () => {
      closeTag.value({ reload: true })
    }
    return {
      teacher,
      handleSave,
      handleBack,
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
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 20px;
  }
}
</style>
