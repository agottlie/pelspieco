// const Order = require('../services/order');
const router = require('express').Router();

router.get('/', (req,res) => {
	res.render('order/index');
})

module.exports = router;