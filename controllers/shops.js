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

// http get for /shops/:id
router.get('/:id', (req, res) => {
    Shop.getShopById(req.params.id, (err, shops) => {
        if (err) return res.json(400, {
            message: `Failed to load shop. Error: ${err}`
         });
        res.send(shops);
    });
});

// http post for /shops/
router.post('/', (req, res) => {
    let newShop =  {
        location: {
            city: req.body.location?.city,
            street: req.body.location?.street,
            coordinates: {
              long: req.body.location?.coordinates?.long,
              lat: req.body.location?.coordinates?.lat,
            },
          },
    };

    Shop.createShop(newShop, (err, shop) => {
        if (err) return res.status(400).json({
            message: `Failed to create shop. Error: ${err}`
         });

        res.send(shop);
    });
});

// http put for /shops/:id
router.put('/:id', (req, res) => {
    Shop.getShopById(req.params.id, (err, oldShop) => {
        if (err) return res.json(400, {
            message: `Failed to find shop. Error: ${err}`
         });
        let updatedShop = {
            location: {
                city: req.body.location?.city || oldShop.location?.city,
                street: req.body.location?.street || oldShop.location?.street,
                coordinates: {
                  long: req.body?.location?.coordinates?.long || oldShop.location?.coordinates?.long,
                  lat: req.body?.location?.coordinates?.lat || oldShop.location?.coordinates?.lat,
                },
            },
        };
    
        Shop.updateShop(req.params.id, updatedShop, (err, shop) => {
            if (err) return res.status(400).json({
                message: `Failed to update shop. Error: ${err}`
             });
    
            res.send(shop);
        });
    });
});

// http delete for /shops/:id
router.delete('/:id', (req, res) => {
    Shop.deleteShop(req.params.id, (err) => {
        if (err) return res.json(400, {
            message: `Failed to delete shop. Error: ${err}`
         });

         res.json({ success: true, message: `Shop deleted successfuly` });
    });
});

export default router;