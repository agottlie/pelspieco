const bcrypt = require('bcryptjs');
const db = require('../models/setup');
const giphy = require('giphy-api')();


function create(user) {
    const password = bcrypt.hashSync(user.password, 10);
    return db.oneOrNone(`INSERT INTO users (name, password_digest) VALUES ($1, $2) RETURNING *;`, [user.name, password]);
};

//searches for a user entry in the "user" db by id
function findByName(name) {
    return db.oneOrNone(`SELECT * FROM users WHERE name = $1;`, [name]);
};

//updates a user entry with the new user name
function update(name, id) {
    return db.one(`UPDATE users SET name=$1 WHERE id=$2 RETURNING *`, [name, id]);
}

function createCalendarEvent(title, description, calendar_date, calendar_time) {
    return db.one(`INSERT INTO calendar (title, description, calendar_date, calendar_time) VALUES ($1,$2,$3,$4) RETURNING *`, [title, description, calendar_date, calendar_time]);
}

function getEvents() {
	return db.manyOrNone(`SELECT * FROM events`);
}

function getCalendar() {
	return db.manyOrNone(`SELECT * FROM calendar`);
}

function getGif() {
    return giphy.random({ tag: 'dog' });
}

module.exports = { create, findByName, update, createCalendarEvent, getEvents, getCalendar, getGif };
