<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-09-18 18:10:39
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="add_container">
    <h1>新增新闻</h1>
    <div class="input">
      <p>新闻标题:</p>
      <el-input v-model="news.title" placeholder="请输入" />
    </div>
    <div class="input">
      <p>新闻来源:</p>
      <el-input v-model="news.origin" placeholder="请输入" />
    </div>
    <div class="input">
      <p>新闻作者:</p>
      <el-input v-model="news.author" placeholder="请输入" />
    </div>
    <div class="input">
      <p>新闻类型:</p>
      <el-input v-model="news.type" placeholder="请输入" />
    </div>
    <div class="input">
      <p>新闻内容:</p>
      <el-input
        v-model="news.content"
        :rows="10"
        type="textarea"
        placeholder="请输入"
      />
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
    const news = reactive({
      title: '',
      content: '',
      origin: '',
      author: '',
      type: '',
    })
    const handleSave = async () => {
      const url = '/news/create'
      const response = await post(url, news)
      if (response.errcode === 0) {
        closeTag.value({ reload: true })
      }
    }
    return {
      news,
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
