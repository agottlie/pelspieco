const router = require('express').Router();
const Admin = require('../models/admin');
const passport = require('passport');

const auth = require('../services/auth');

let eventsData = {};
let calendarData = {};

router.post('/', passport.authenticate(
    'local-signup', {
        failureRedirect: '/admin/new',
        successRedirect: '/admin'
    }
));

router.get('/new', (req, res) => {
    res.render('admin/new');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/', auth.restrict, (req, res) => {
    res.render('admin/index');
});

router.get('/events', auth.restrict, (req, res) => {
    Admin
        .getEvents()
        .then(data => {
            eventsData.data = data;
            res.render('admin/events', eventsData);
        })
});

router.get('/calendar', auth.restrict, (req, res) => {
    Admin
        .getCalendar()
        .then(data => {
            calendarData.data = data;
            calendarData.data.forEach(d => {
                let newTime = parseInt(d.calendar_time)
                if (d.calendar_time.substr(d.calendar_time.length - 2, 1) === "P") {
                    newTime += 12;
                }
                d.start = d.calendar_date + "T" + newTime + ":" + d.calendar_time.substr(d.calendar_time.length - 5, 2) + ":00";
            })
            console.log(calendarData.data);
            res.render('admin/calendar', calendarData);
        })
})

router.get('/newcalendar', auth.restrict, (req, res) => {
    res.render('admin/newcalendar');
})

router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/admin/login',
        successRedirect: '/admin'
    }
));

router.post('/calendar', (req, res) => {
    const title = req.body.title,
        description = req.body.description,
        calendar_date = req.body.calendar_date,
        calendar_time = req.body.calendar_time;

    Admin
        .createCalendarEvent(title, description, calendar_date, calendar_time)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
});


module.exports = router;