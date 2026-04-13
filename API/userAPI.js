import exp from 'express'
import { verifyToken } from "../middleware/verifyToken.js"
import { articleModel } from "../Models/articleModel.js"

export const userApp = exp.Router()

// Read all active articles
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  try {
    const articleList = await articleModel.find({ isArticleActive: true })
    res.status(200).json({ message: "articles", payload: articleList })
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message })
  }
})

// Add comment
userApp.put("/articles/comment", verifyToken("USER"), async (req, res) => {
  try {
    const { articleId, comment } = req.body

    if (!articleId || !comment) {
      return res.status(400).json({ message: "articleId and comment required" })
    }

    const articleDocument = await articleModel.findOne({
      _id: articleId,
      isArticleActive: true
    })

    if (!articleDocument) {
      return res.status(404).json({ message: "Article not found" })
    }

    const userId = req.user?.id

    articleDocument.comments.push({ user: userId, comment })

    await articleDocument.save()

    res.status(200).json({ message: "comment added", payload: articleDocument })

  } catch (err) {
    res.status(500).json({ message: "error", error: err.message })
  }
})