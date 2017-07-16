const Order = require('../services/square');
const router = require('express').Router();
const util = require('util');

router.get('/', (req, res) => {
    Order
    	.findAllPies()
    	.then(data => {
    		console.log("ALL PIE DATA" + util.inspect(data))
    		res.render('order/index', {data});
    	})    
});

router.get('/confirm', (req, res) => {
    res.render("order/confirm");
});

router.post('/', (req, res) => {
    let data = {}

    const id = req.body.id,
    	key = req.body.key;

    Order
        .findItem(id)
        .then((item) => {
            // console.log("ITEM IS: " + util.inspect(item.data.object.item_variation_data));
            //add item info to data
            data = {
                "idempotency_key": key,
                "order": {
                    "reference_id": "reference_id",
                    "line_items": [{
                        "name": item.data.object.item_variation_data.name,
                        "quantity": "1",
                        "base_price_money": {
                            "amount": parseInt(item.data.object.item_variation_data.price_money.amount),
                            "currency": "USD"
                        },
                        "discounts": [{
                            "name": "7% off previous season item",
                            "percentage": "7"
                        }, {
                            "name": "$3 off Customer Discount",
                            "amount_money": {
                                "amount": 300,
                                "currency": "USD"
                            }
                        }]
                    }]
                },
                "ask_for_shipping_address": true,
                "merchant_support_email": "merchant+support@website.com",
                "pre_populate_buyer_email": "example@email.com",
                "pre_populate_shipping_address": {
                    "address_line_1": "1455 Market St.",
                    "address_line_2": "Suite 600",
                    "locality": "San Francisco",
                    "administrative_district_level_1": "CA",
                    "postal_code": "94103",
                    "country": "US",
                    "first_name": "Jane",
                    "last_name": "Doe"
                },
                "redirect_url": "https://www.pelspieco.com"
            }

            // console.log("Beforepassing")
            // console.log(data.order.line_items);
            return Order.passOrder(data);
        })
        .then((result) => {
            // console.log("DATA FROM INSIDE THE CONTROLLER");
            // console.log(result);
            res.render('order/confirm');
        })
})

module.exports = router;
