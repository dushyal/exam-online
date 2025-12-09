import express from "express";
import { Option } from "../../models/index.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const router = express.Router();

// Add Option
router.post("/add", adminOnly, async (req, res) => {
  const option = await Option.create(req.body);
  res.json(option);
});

// Update Option
router.put("/:id", adminOnly, async (req, res) => {
  await Option.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Option updated" });
});

// Delete Option
router.delete("/:id", adminOnly, async (req, res) => {
  await Option.destroy({ where: { id: req.params.id } });
  res.json({ message: "Option deleted" });
});

export default router;
