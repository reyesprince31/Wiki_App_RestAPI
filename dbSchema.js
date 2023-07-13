import mongoose, { Schema } from "mongoose";

const mongoClient = mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = new Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

export { Article, mongoClient };
