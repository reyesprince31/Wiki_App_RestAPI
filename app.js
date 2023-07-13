import express from "express";
import { Article } from "./dbSchema.js";

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  Article.find({}).then(() => {
    console.log("Connected to DB");
  });
});

app.listen(port, () => {
  console.log(`Successfully Connected to Port ${port}`);
});
