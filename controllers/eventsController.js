const router = require('express').Router();
const Events = require('../models/events');
const nodemailer = require('nodemailer');

const eventsData = {};

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'buttercup.alison',
        pass: process.env.GOOGLE_PASS
    }
});


router.get('/', (req, res) => {
    res.render('events/index');
})

router.get('/thanks', (req, res) => {
    res.render('events/thanks');
})

router.get('/login', (req, res) => {
    res.render('events/login');
})

router.get('/show', (req, res) => {
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

    let mailOptions = {
        from: '"Alison" <buttercup.alison@gmail.com>', // sender address
        to: 'alison.pels@gmail.com', // list of receivers
        subject: `Event Details for ${first_name} ${last_name}`, // Subject line
        html:  `<h3>Email: ${email}</h3> 
                <h3>First Name: ${first_name}</h3>
                <h3>Last Name: ${last_name}</h3>
                <h3>Phone Number: ${phone}</h3>
                <h3>Number of People: ${num_people}</h3>
                <h3>Type of Event: ${type_of_event}</h3>
                <h3>Event Date: ${event_date}</h3>
                <h3>Event Time: ${event_time}</h3>` // html body
    };


    Events
        .create(email, first_name, last_name, phone, num_people, type_of_event, event_time, event_date)
        .then(data => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
});

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
