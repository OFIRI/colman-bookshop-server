import { Router } from "express";
import pkg from "bloom-filters";
import { Order } from "../models/order.js";
import { Book } from "../models/book.js";
const { CountMinSketch } = pkg;

const router = Router();
const errorRate = 0.01;
const accuracy = 0.99;
const sketch = CountMinSketch.create(errorRate, accuracy);
let render = false;
router.post("/init", async (req, res) => {
  if (!render) {
    try {
      const orders = await Order.getAllOrders();
      orders.forEach((order) => {
        order.books.forEach((book) => {
          sketch.update(book.book._id.toString(), book.quantity);
        });
      });
      render = true;
      res.status(200).send(sketch.saveAsJSON());
    } catch (error) {
      return res.status(400).json({ message: error.toString() });
    }
  }
});
router.get("/count/:id", (req, res) => {
  try {
    const count = sketch.count(req.params.id);
    return res.send(count.toString());
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
});
router.get("/getAllCounts", (req, res) => {
  let arr = [];
  Book.getAllBooks(req.query, (err, books) => {
    if (err)
      return res.status(400).json({
        message: `Failed to load books. Error: ${err}`,
      });
    books.forEach((book) => {
      let element = {
        id: book._id,
        title: book.title,
        count: sketch.count(book._id.toString()),
      };
      arr.push(element);
    });
    res.status(200).send(arr);
  });
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
