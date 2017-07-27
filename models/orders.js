const db = require('../models/setup');

function piesInStock() {
    return db.manyOrNone('SELECT square_id FROM pies');
}

function destroy(id) {
	return db.none('DELETE FROM pies WHERE pies.square_id=$1', [id]);
}

function checkPassword(password) {
    if (password === process.env.PASSWORD) {
        return true;
    } else {
    	return false;
    }
}


module.exports = { piesInStock, destroy, checkPassword };