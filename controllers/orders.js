import { Router } from 'express';
import authorize from '../middlewares/auth';
const router = Router();
import { Order } from '../models/order';

router.post(authorize, "/orders", (req, res) => {
    const { userId } = req.locals.session;
    const { books } = req.body;
    Order.createNewOrder(books, userId);
})