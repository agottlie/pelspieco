const Order = require('../services/square');
const router = require('express').Router();
const util = require('util');
let orderData = {};

router.get('/', (req, res) => {
    orderData = {};

    Order
        .findAllPies()
        .then(data => {
            res.render('order/index', { data });
        })
});

router.get('/review/', (req, res) => {
    res.render("order/review", orderData);
})

router.post('/review/', (req, res) => {
    orderData = req.body;
    res.render("order/review", orderData);
})

router.post('/', (req, res) => {

    const items = req.body,
        key = req.body.key,
        delivery = req.body.deliveryValue;

    console.log("ITEMS: " + util.inspect(items));
    console.log("KEY: " + key);
    console.log("DELIVERY: " + delivery);

    let data = {
        "idempotency_key": key,
        "order": {
            "reference_id": "",
            "line_items": []
        },
        "redirect_url": "http://pelspieco.com/confirm/"
    }

    for (let i = 0; i < items.items.length; i++) {
        let lineItem = {
            "name": items.items[i].name,
            "quantity": items.items[i].quantity,
            "base_price_money": {
                "amount": 100,
                "currency": "USD"
            }
        }
        data.order.line_items.push(lineItem);
    }

    if (delivery === "true") {
        data.ask_for_shipping_address = true;
        data.order.reference_id = "delivery"
    } else {
        data.order.reference_id = "pickup"
    }

    Order
        .passOrder(data)
        .then((result) => {
            res.json(result.data.checkout);
        })
})

module.exports = router;