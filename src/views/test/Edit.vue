<template>
  <div class="add_container">
    <h1>新增新闻</h1>
    <div class="input">
      <p>新闻标题:</p>
      <el-input v-model="news.title" placeholder="Please input" />
    </div>
    <div class="input">
      <p>新闻来源:</p>
      <el-input v-model="news.origin" placeholder="Please input" />
    </div>
    <div class="input">
      <p>新闻作者:</p>
      <el-input v-model="news.author" placeholder="Please input" />
    </div>
    <div class="input">
      <p>新闻内容:</p>
      <el-input
        v-model="news.content"
        :rows="10"
        type="textarea"
        placeholder="Please input"
      />
    </div>
    <div class="btn">
      <el-button type="primary" plain @click="handleSave">保存</el-button>
      <el-button type="primary" plain @click="handleBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useCloseTag from '@/hooks/useCloseTag'
import { get, post } from '@/api/request'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { id } = route.params
    const { closeTag } = useCloseTag()
    const news = ref({
      title: '',
      content: '',
      origin: '',
      author: '',
      type: '',
    })
    async function getNews() {
      const url = `/news/${id}`
      const response = await get(url)
      if (response.errcode === 0) {
        news.value = response.data
      }
    }
    getNews()
    const handleSave = async () => {
      const url = '/news/update'
      const data = {
        ...news.value,
        id,
      }
      const response = await post(url, data)
      if (response.errcode === 0) {
        closeTag.value({ reload: true })
      }
    }
    const handleBack = () => {
      closeTag.value({ reload: true })
    }
    return {
      news,
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
