DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS calendar CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS grocery CASCADE;

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	email VARCHAR(255),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	phone VARCHAR(255),
	num_people VARCHAR(255),
	type_of_event VARCHAR(255),
	event_date VARCHAR(255),
	event_time VARCHAR(255)
);

CREATE TABLE calendar (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	description VARCHAR(255),
	calendar_date VARCHAR(255),
	calendar_time VARCHAR(255)
);

CREATE TABLE users (
 	id SERIAL PRIMARY KEY,
  	password_digest VARCHAR NOT NULL,
  	name VARCHAR(255)
);

CREATE TABLE grocery (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	measurement VARCHAR(255),
	jetro_price FLOAT(53),
	dairyland_price FLOAT(53),
	baldor_price FLOAT(53),
	dollartree_price FLOAT(53),
	other_price FLOAT(53)
);