// 2.1 onRequest（v2 版）
const { onRequest } = require('firebase-functions/v2/https')
// 2.2 admin
const admin = require('firebase-admin')
// 2.3 CORS
const cors = require('cors')({ origin: true })

admin.initializeApp()
const db = admin.firestore()

// 2.4 countBooks（HTTP 函数）
exports.countBooks = onRequest(async (req, res) => {
  // —— 小优化：OPTIONS 预检，减少 CORS 报错 ——
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*')                 // 开发期放宽；上线可改为你的前端域名
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).send('')
  }

  // 用 cors 包裹（与上面的手动设置可并存，更稳）
  cors(req, res, async () => {
    try {
      // 2.5 业务逻辑：统计 books 集合数量 —— 优先用聚合 count（更快更省费）
      const agg = await db.collection('books').count().get()
      const count = agg.data().count

      res.set('Access-Control-Allow-Origin', '*')
      return res.status(200).json({ count })
    } catch (err) {
      // 如果你的 Firestore 版本过旧，不支持 .count()，可以退化为：
      // const snap = await db.collection('books').get()
      // const count = snap.size

      console.error('countBooks error:', err)
      res.set('Access-Control-Allow-Origin', '*')
      return res.status(500).json({ error: err.message || 'Internal error' })
    }
  })
})
