import express from "express";
import { Article } from "./dbSchema.js";

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app
  .route("/articles")
  .get(async (req, res) => {
    const result = await Article.find({});

    if (result.length) {
      console.log(result);
      res.send(result);
      result.forEach((article) => {
        console.log(article.title);
      });
    } else {
      console.log("No Result Found");
    }
  })

  .post(async (req, res) => {
    const { title, content } = req.body;

    const newArticle = new Article({
      title: title,
      content: content,
    });

    try {
      await newArticle.save();
      res.status(201).json({
        message: "Article created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  })

  .delete(async (req, res) => {
    const title = req.body;
    const articlesToDelete = await Article.deleteMany({});

    if (articlesToDelete.length) {
      await articlesToDelete.deleteMany();
      res.status(200).json({
        message: "Articles deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "No articles found with title ",
      });
    }
  });

app
  .route("/articles/:articleTitle")
  .get(async (req, res) => {
    const articleTitle = req.params.articleTitle;
    const articleStoreTitle = await Article.findOne({ title: articleTitle });

    if (articleStoreTitle) {
      res.json(articleStoreTitle);
    } else {
      res.status(404).json({
        message: "No article found with title " + articleTitle,
      });
    }
  })
  .put(async (req, res) => {
    const { title, content } = req.body;
    const updateResult = await Article.updateOne(
      { title: req.params.articleTitle },
      { title, content }
    );

    if (updateResult) {
      // res.json(updateResult);
      res.status(200).json({
        message: "Article updated successfully",
      });
    } else {
      res.status(404).json({
        message: "No article found with title " + req.params.articleTitle,
      });
    }
  })
  .delete(async (req, res) => {
    const deleteResult = await Article.deleteOne({
      title: req.params.articleTitle,
    });

    if (deleteResult.deletedCount === 1) {
      res.status(200).json({
        message: "Article deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "No article found with title " + req.params.articleTitle,
      });
    }
  });

app.listen(port, () => {
  console.log(`Successfully Connected to Port ${port}`);
});
