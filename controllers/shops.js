import { Router } from 'express';
const router = Router();
import { Shop } from '../models/shop.js';

// http get for /shops/
router.get('/', (req, res) => {
    Shop.getAllShops((err, shops) => {
        if (err) return res.json(400, {
            message: `Failed to load all shops. Error: ${err}`
         });
        res.send(shops);
    });
});

export default router;