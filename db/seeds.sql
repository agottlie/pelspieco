DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF ESISTS pies CASCADE;

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


CREATE TABLE pies (
	id SERIAL PRIMARY KEY,
	square_id VARCHAR(255)
);