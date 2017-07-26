const axios = require('axios');
const util = require('util');

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

module.exports = { passOrder, findTransaction, findAllPies };
