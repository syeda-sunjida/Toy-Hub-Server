const client = require("../db");
const generateSlugFromTitle = require("../utils/generateSlugFromTitle");

const getAllBlogs = async (req, res) => {
  const blogCollection = client.db('toyHub').collection("blog");
  const blogs = await blogCollection.find({}).toArray();

  res.json({ blogs });
};

const getBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  const blogCollection = client.db('toyHub').collection("blog");
  console.log(slug);

  const blog = await blogCollection.findOne({ slug });
  console.log(blog);

  res.json({ blog });
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!content) return res.status(400).json({ error: "Content is required" });
  if (typeof title !== "string" || typeof content !== "string")
    return res.status(400).json({ error: "Invalid title or content" });

  const blogCollection = client.db('toyHub').collection("blog");
  const blog = await blogCollection.insertOne({
    title,
    content,
    slug: generateSlugFromTitle(title),
  });
  res.json({ blog });
};

module.exports = {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
};
