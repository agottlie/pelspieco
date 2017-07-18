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

router.get('/confirm', (req, res) => {
    res.render("order/confirm");
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
    // console.log("ITEM IS: " + util.inspect(items.data.objects));
    // add item info to data
    let data = {
        "idempotency_key": key,
        "order": {
            "reference_id": "reference_id",
            "line_items": []
        },
        // "merchant_support_email": "merchant+support@website.com",
        // "pre_populate_buyer_email": "example@email.com",
        // "pre_populate_shipping_address": {
        //     "address_line_1": "1455 Market St.",
        //     "address_line_2": "Suite 600",
        //     "locality": "San Francisco",
        //     "administrative_district_level_1": "CA",
        //     "postal_code": "94103",
        //     "country": "US",
        //     "first_name": "Jane",
        //     "last_name": "Doe"
        // },
        "redirect_url": "localhost:3000/order/confirm"
    }

    for (let i = 0; i < items.items.length; i++) {
        let lineItem = {
            "name": items.items[i].name,
            "quantity": items.items[i].quantity,
            "base_price_money": {
                "amount": 3000,
                "currency": "USD"
            }
            // "discounts": [{
            //     "name": "7% off previous season item",
            //     "percentage": "7"
            // }, {
            //     "name": "$3 off Customer Discount",
            //     "amount_money": {
            //         "amount": 300,
            //         "currency": "USD"
            //     }
            // }]
        }
        data.order.line_items.push(lineItem);
    }

    if (delivery === "true") {
        data.ask_for_shipping_address = true;
    }

    // console.log("Beforepassing")
    // console.log(util.inspect(data));
    Order
        .passOrder(data)
        .then((result) => {
            // console.log("DATA FROM INSIDE THE CONTROLLER");
            // console.log(result);
            res.json(result.data.checkout);
        })
})

module.exports = router;
