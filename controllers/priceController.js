const router = require('express').Router();
const Price = require('../models/price');
const passport = require('passport');

const auth = require('../services/auth');

let priceData = {};

router.get('/', auth.restrict, (req, res) => {
    res.render('price/index');
});

router.get('/list', auth.restrict, (req,res) => {
	Price
		.getPrices()
		.then(data => {
			priceData.data = data;
			res.render('price/list', priceData);
		})
})

router.get('/add', auth.restrict, (req,res) => {
	Price
		.getPrices()
		.then(data => {
			priceData.data = data;
			res.render('price/add', priceData);
		})
})

router.post('/', (req, res) => {
    const name = req.body.name,
        measurement = req.body.measurement,
        price = req.body.price,
        vendor = req.body.vendor;

    Price
        .create(name, measurement, vendor, price)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
});

router.put('/', (req, res) => {
    const id = req.body.id,
        measurement = req.body.measurement,
        price = req.body.price,
        vendor = req.body.vendor;

    Price
        .update(id, measurement, vendor, price)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
});

module.exports = router;