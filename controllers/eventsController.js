const router = require('express').Router();
const Events = require('../models/events');
const Trello = require('../services/trello');

const eventsData = {};

//events 'GET" routes
router.get('/', (req, res) => {
    res.render('events/index');
})

router.get('/thanks', (req, res) => {
    res.render('events/thanks');
})

//event inquiry submit route
router.post('/', (req, res) => {
    const email = req.body.email,
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        phone = req.body.phone,
        num_people = req.body.num_people,
        type_of_event = req.body.type_of_event,
        event_date = req.body.event_date,
        event_time = req.body.event_time;
    let checklistId;

    Events
        .create(email, first_name, last_name, phone, num_people, type_of_event, event_time, event_date)
        .then(data => {
            return Trello.createCard(event_date, type_of_event);
        })
        .then(data => {
            return Trello.createList(data.data.id);
        })
        .then(data => {
            checklistId = data.data.id;
            let fullName = first_name + " " + last_name;
            return Trello.createListItem(checklistId, "Name:", fullName);
        })
        .then(data => {
            return Trello.createListItem(checklistId, "Email:", email);
        })
        .then(data => {
            return Trello.createListItem(checklistId, "Phone Number:", phone);
        })
        .then(data => {
            return Trello.createListItem(checklistId, "Number of People:", num_people);
        })
        .then(data => {
            return Trello.createListItem(checklistId, "Event Time:", event_time);
        })
        .then(data => {
            res.render('events/thanks');
        })
        .catch(err => console.log('ERROR: ', err));
});

//admin login route
router.put('/login', (req, res) => {
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