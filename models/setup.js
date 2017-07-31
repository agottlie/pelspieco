pgp = require('pg-promise')();

var db = pgp(process.env.DATABASE_URL || 'postgres://Andrew:lowercase@aa1hp1jrbjk3jbc.c0koy5d0c2jy.us-west-2.rds.amazonaws.com:5432/ebdb');

module.exports = db;