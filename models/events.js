const db = require('../models/setup');

//creates a new event listing
function create(email, first_name, last_name, phone, num_people, type_of_event, event_time, event_date) {
    return db.one(`INSERT INTO events (email, first_name, last_name, phone, num_people, type_of_event, event_time, event_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [email, first_name, last_name, phone, num_people, type_of_event, event_time, event_date]);
}

module.exports = { create };
