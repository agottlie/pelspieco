const axios = require('axios');
const util = require('util');

function passOrder(data) {
    // console.log("DATA FROM INSIDE THE SERVICE")
    // console.log(data);

    const queryPromise = axios({
        url: `https://connect.squareup.com/v2/locations/EYXHZ8T51YJ2A/checkouts`,
        method: 'POST',
        data: data,
        headers: {
            'Authorization': 'Bearer sq0atp-lvYsCiFTP3Hk_XIkZbI1bQ',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    // .then(function(response) {
    //         console.log(response);
    //     })
    //     .catch(function(error) {
    //         console.log("ERRORRR" + util.inspect(error.response.data));
    //     });

    return queryPromise;
};

function findItem(id) {

	const queryPromise = axios({
        url: `https://connect.squareup.com/v2/catalog/object/${id}`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer sq0atp-lvYsCiFTP3Hk_XIkZbI1bQ',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    // .then(function(response) {
    //         console.log(response);
    //     })
    //     .catch(function(error) {
    //         console.log("ERRORRR" + util.inspect(error.response.data));
    //     });

    return queryPromise;
}

function findAllPies() {
	const queryPromise = axios({
        url: `https://connect.squareup.com/v2/catalog/object/NPKDYGON7FKWNST7XE3V75Z6`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer sq0atp-lvYsCiFTP3Hk_XIkZbI1bQ',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return queryPromise;
}

module.exports = { passOrder, findItem, findAllPies };
