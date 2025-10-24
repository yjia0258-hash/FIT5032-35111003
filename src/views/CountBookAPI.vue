<template>
  <div class="api-page">
    <h1>Count Book API</h1>

    <p v-if="loading">Loading…</p>
    <p v-if="error" class="error">error: {{ error }}</p>

    <!-- 用 <pre> 包裹，格式化展示 JSON -->
    <pre v-if="jsondata">{{ prettyJson }}</pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CountBookAPI',
  data () {
    return {
      jsondata: null,
      loading: false,
      error: ''
    }
  },
  computed: {
    // 美化 JSON 输出
    prettyJson () {
      try { return JSON.stringify(this.jsondata, null, 2) }
      catch { return this.jsondata }
    }
  },
  mounted () {
    // 页面打开就请求 API（无需按钮）
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI () {
      this.loading = true
      this.error = ''
      try {
        // ⚠️ 换成你自己的云函数 URL
        const url = 'https://<你的域名>.cloudfunctions.net/countBooks'
        const res = await axios.get(url, { timeout: 10000 })
        // 只取 response.data
        this.jsondata = res.data
      } catch (e) {
        console.error('Error fetching book count:', e)
        this.error = e?.response?.data?.error || e?.message || 'Request failed'
        this.jsondata = null
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.api-page { max-width: 860px; margin: 24px auto; }
pre {
  padding: 12px; background:#0b1020; color:#d6e7ff;
  border-radius: 8px; overflow:auto; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.error { color:#d93025; }
</style>
