pgp = require('pg-promise')();

var db = pgp(process.env.DATABASE_URL || 'postgres://Andrew:lowercase@aaxmhqw4v4k8k5.c0koy5d0c2jy.us-west-2.rds.amazonaws.com:5432/ebdb');

module.exports = db;