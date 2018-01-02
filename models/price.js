const db = require('../models/setup');

function create(name, measurement, v, price) {
    let vendor = v + "_price";
    return db.one(`INSERT INTO grocery (name, measurement, ${vendor}) VALUES ($1,$2, $3) RETURNING *`, [name, measurement, price]);
}

function getPrices() {
	return db.manyOrNone(`SELECT * FROM grocery`);
}

function update(id, measurement, v, price) {
    let vendor = v + "_price";
    return db.one(`UPDATE grocery SET measurement=$1, ${vendor}=$2 WHERE id=$3 RETURNING *`, [measurement, price, id]);
}

module.exports = { getPrices, create, update };