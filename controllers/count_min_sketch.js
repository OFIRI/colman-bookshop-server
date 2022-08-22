import { Router } from "express";
import pkg from "bloom-filters";
const { CountMinSketch } = pkg;
const router = Router();
const errorRate = 0.01;
const accuracy = 0.99;
const sketch = CountMinSketch.create(errorRate, accuracy);
router.get("/count/:id", (req, res) => {
  try {
    const count = sketch.count(req.params.id);
    return res.send(count.toString);
  } catch (error) {
    return res.status(400).json({ message: "an error occured" });
  }
});
router.post("/update/:id", (req, res) => {
  try {
    const id = req.params.id;
    sketch.update(id, 1);
    const count = sketch.count(id);
    res.status(200).send(count.toString());
  } catch (error) {
    res.sendStatus(400);
  }
});
router.get("getJson", (req, res) => {
  try {
    const json = sketch.saveAsJSON();
    res.status(200).json(json);
  } catch (error) {
    res.status(400).json({ message: "an error occured" });
  }
});
export default router;
