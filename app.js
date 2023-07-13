import express from "express";
import { Article } from "./dbSchema.js";

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const result = await Article.find({});

  if (result.length) {
    // console.log(result);
    res.send(result);
    result.forEach((article) => {
      console.log(article.title);
    });
  } else {
    console.log("No Result Found");
  }
});

app.post("/articles", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Successfully Connected to Port ${port}`);
});
