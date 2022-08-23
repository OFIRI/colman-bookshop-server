import { Router } from 'express';
import admin from '../middlewares/admin.js'
import authorize from '../middlewares/auth.js';
const router = Router();
import { Order } from '../models/order.js';

router.post("/", authorize, (req, res) => {
    const { userId } = res.locals.session;
    const { shoppingCart } = req.body;

    const books = Object.keys(shoppingCart).map((itemId) => {
        return { book: shoppingCart[itemId].book._id, quantity: shoppingCart[itemId].quantity }
    })
    Order.createNewOrder(books, userId);
    return res.send("ok")
})


router.get("/", async (req, res) => {
    const orders = await Order.getAllOrders();
    return res.send(orders);
})

router.get("/:id", authorize, async (req, res) => {
    const { id } = req.params;
    const order = await Order.getOrderById(id);
    return res.send(order);
})

router.get("/getUserOrders", authorize, async (req, res) => {
    const { userId } = req.locals.session;
    const orders = await Order.getUsersOrder(userId);
    return res.send(orders);
})

export default router;