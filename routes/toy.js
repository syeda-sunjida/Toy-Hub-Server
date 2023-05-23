const Router = require("express").Router;
const {
  getAllToys,
  getToyBySlug,
  createToy,
  updateToy,
  deleteToy,
  getToysBySellerId,
} = require("../toy");

const toyRouter = Router();

toyRouter.get("/", getAllToys);
toyRouter.get("/:slug", getToyBySlug);
toyRouter.post("/", createToy);
toyRouter.put("/:id", updateToy);
toyRouter.delete("/:id", deleteToy);
toyRouter.get("/seller/:sellerId", getToysBySellerId);

module.exports = toyRouter;
