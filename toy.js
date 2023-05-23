const client = require("../db");
const generateSlugFromTitle = require("../utils/generateSlugFromTitle");

const getAllToys = async (req, res) => {
  const toyCollection = client.db('toyHub').collection("toy");
  const toys = await toyCollection.find({}).toArray();

  res.json({ toys });
};

const getToyBySlug = async (req, res) => {
  const { slug } = req.params;
  const toyCollection = client.db('toyHub').collection("toy");

  const toy = await toyCollection.findOne({ slug });

  res.json({ toy });
};

const createToy = async (req, res) => {
  const {
    name,
    sellerName,
    sellerEmail,
    subCategory,
    price,
    sellerId,
    quantity,
    description,
    rating,
    imageUrl,
  } = req.body;

  if (!name) return res.status(400).json({ error: "Title is required" });
  if (!sellerName)
    return res.status(400).json({ error: "Seller name is required" });
  if (!sellerEmail)
    return res.status(400).json({ error: "Seller email is required" });
  if (!subCategory)
    return res.status(400).json({ error: "Sub Category is required" });
  if (!description)
    return res.status(400).json({ error: "Description is required" });
  if (!sellerId)
    return res.status(400).json({ error: "Seller Id is required" });
  if (
    typeof name !== "string" ||
    typeof sellerName !== "string" ||
    typeof sellerEmail !== "string" ||
    typeof subCategory !== "string" ||
    typeof price !== "number" ||
    typeof quantity !== "number" ||
    typeof description !== "string" ||
    typeof rating !== "number" ||
    typeof sellerId !== "string"
  )
    return res.status(400).json({ error: "Invalid title or content" });

  const toyCollection = client.db('toyHub').collection("toy");
  const toy = await toyCollection.insertOne({
    name,
    sellerName,
    sellerEmail,
    subCategory,
    imageUrl,
    price,
    sellerId,
    quantity,
    rating,
    description,
    slug: generateSlugFromTitle(name),
  });
  res.json({ toy });
};

const getToysBySellerId = async (req, res) => {
  const { sellerId } = req.params;
  const toyCollection = client.db('toyHub').collection("toy");
  const toys = await toyCollection.find({ sellerId }).toArray();
  res.json({ toys });
};

const updateToy = async (req, res) => {
  const { id } = req.params;
  const toyCollection = client.db('toyHub').collection("toy");
  const toy = await toyCollection.findOneAndUpdate({ id }, { $set: req.body });
  res.json({ toy });
};

const deleteToy = async (req, res) => {
  const { id } = req.params;
  const toyCollection = client.db('toyHub').collection("toy");
  const toy = await toyCollection.findOneAndDelete({ id });
  res.json({ toy });
};

module.exports = {
  getAllToys,
  getToysBySellerId,
  getToyBySlug,
  createToy,
  updateToy,
  deleteToy,
};
