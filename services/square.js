const axios = require('axios');
const util = require('util');


//sends order details to Square's payment page
function passOrder(data) {
    const queryPromise = axios({
        url: `https://connect.squareup.com/v2/locations/EYXHZ8T51YJ2A/checkouts`,
        method: 'POST',
        data: data,
        headers: {
            'Authorization': `Bearer ${process.env.SQUARE_AUTH}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return queryPromise;
};

//retrieves transaction data
function findTransaction(id) {
    const queryPromise = axios({
        url: `https://connect.squareup.com/v2/locations/EYXHZ8T51YJ2A/transactions/${id}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.SQUARE_AUTH}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return queryPromise;
}

function findOrder(id) {
    console.log("in Service");
    console.log(id);
    const queryPromise = axios({
        url: `https://connect.squareup.com/v2/locations/EYXHZ8T51YJ2A/orders/batch-retrieve`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.SQUARE_AUTH}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            'order_ids': [id]
        }
    })

    return queryPromise;
}

//queries Square for all pies currently in stock
function findAllPies() {
    const queryPromise = axios({
        url: `https://connect.squareup.com/v2/catalog/object/NPKDYGON7FKWNST7XE3V75Z6`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.SQUARE_AUTH}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return queryPromise;
}

module.exports = { passOrder, findTransaction, findAllPies, findOrder};