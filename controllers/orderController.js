const Order = require('../services/square');
const router = require('express').Router();
const util = require('util');
let orderData = {};

router.get('/', (req, res) => {
    orderData = {};

    Order
        .findAllPies()
        .then(data => {
            let pieData = [];
            data.data.object.item_data.variations.forEach(pie => {
                if (pie.present_at_location_ids) {
                    pieData.push(pie);
                }
            })
            data.data.object.item_data.variations = pieData;
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

    let quantity = 0;

    for (let i = 0; i < items.items.length; i++) {
        let lineItem = {
            "name": items.items[i].name,
            "quantity": items.items[i].quantity,
            "base_price_money": {
                "amount": 3000,
                "currency": "USD"
            }
        }
        data.order.line_items.push(lineItem);
        quantity += parseInt(items.items[i].quantity);
        console.log("QUANTITY:" + quantity);
    }


    const quantityAmount = (quantity + 1) * 500;

    console.log(util.inspect(data.order.line_items));

    if (delivery === "true") {
        data.ask_for_shipping_address = true;
        data.order.reference_id = "delivery"
        let lineItem = {
            "name": "Shipping",
            "quantity": '1',
            "base_price_money": {
                "amount": quantityAmount,
                "currency": "USD"
            }
        }
        data.order.line_items.push(lineItem);
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