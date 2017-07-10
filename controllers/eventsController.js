const router = require('express').Router();
const Events = require('../models/events');

const eventsData = {};

router.get('/', (req,res) => {
	res.render('events/index');
})

router.get('/thanks', (req,res) => {
	res.render('events/thanks');
})

router.get('/login', (req,res) => {
	res.render('events/login');
})

router.get('/show', (req,res) => {
	res.render('events/show', eventsData);
})

router.post('/', (req, res) => {
    const email = req.body.email,
    	first_name = req.body.first_name,
    	last_name = req.body.last_name,
    	phone = req.body.phone,
    	num_people = req.body.num_people,
    	type_of_event = req.body.type_of_event,
    	event_date = req.body.event_date,
    	event_time = req.body.event_time;

    Events
        .create(email, first_name, last_name, phone, num_people, type_of_event, event_time, event_date)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

router.put('/login', (req,res) => {
	const password = req.body.password;

	Events
		.checkPassword(password)
		.then(data => {
			console.log(data);
			eventsData.data = data;
			res.render('events/show', eventsData)
		});
});

module.exports = router;