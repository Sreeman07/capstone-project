import exp from "express";
import { userModel } from "../Models/userModel.js";
import { articleModel } from "../Models/articleModel.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const authorApp = exp.Router();


// ================= CREATE ARTICLE =================
authorApp.post("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const articleObj = req.body;
    const user = req.user;

    // check author
    const author = await userModel.findById(articleObj.author);

    if (!author) {
      return res.status(404).json({ message: "invalid author" });
    }

    if (author.email !== user.email) {
      return res.status(403).json({ message: "you are not authorized" });
    }

    const articleDoc = new articleModel(articleObj);
    await articleDoc.save();

    res.status(201).json({
      message: "article published successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "error occured",
      error: err.message,
    });
  }
});


// ================= READ OWN ARTICLES =================
authorApp.get("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const authorId = req.user.id;

    const articlesList = await articleModel.find({
      author: authorId, // ✅ FIXED
    });

    res.status(200).json({
      message: "articles",
      payload: articlesList,
    });
  } catch (err) {
    res.status(500).json({
      message: "error occured",
      error: err.message,
    });
  }
});


// ================= UPDATE ARTICLE =================
authorApp.put("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const authorId = req.user.id;

    const { articleId, title, category, content } = req.body;

    const modifiedArticle = await articleModel.findOneAndUpdate(
      { _id: articleId, author: authorId },
      { $set: { title, category, content } },
      { new: true }
    );

    if (!modifiedArticle) {
      return res
        .status(403)
        .json({ message: "not authorised to edit article" });
    }

    res.status(200).json({
      message: "article modified",
      payload: modifiedArticle,
    });
  } catch (err) {
    res.status(500).json({
      message: "error occured",
      error: err.message,
    });
  }
});


// ================= DELETE / RESTORE =================
authorApp.patch("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const authorId = req.user.id;

    const { articleId, isArticleActive } = req.body;

    const article = await articleModel.findOne({
      _id: articleId,
      author: authorId,
    });

    if (!article) {
      return res.status(404).json({ message: "article not found" });
    }

    if (isArticleActive === article.isArticleActive) {
      return res.status(200).json({
        message: "article already in the same state",
      });
    }

    article.isArticleActive = isArticleActive;
    await article.save();

    res.status(200).json({
      message: "article modified",
      payload: article,
    });
  } catch (err) {
    res.status(500).json({
      message: "error occured",
      error: err.message,
    });
  }
});