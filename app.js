const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const Order = require('./services/square');
const util = require('util');
const Trello = require('./services/trello');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// ====================================================================
// PASSPORT STUFF
const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

// END PASSPORT STUFF

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//controller routes
app.use('/order', require('./controllers/orderController'));
app.use('/events', require('./controllers/eventsController'));
app.use('/price', require('./controllers/priceController'));
app.use('/admin', require('./controllers/adminController'));

//renders the landing page
app.get('/', (req, res) => {
    res.render('index');
});

//renders the confirmation page
app.get('/confirm', (req, res) => {
    let id = req.query.transactionId;
    let delivery = req.query.referenceId;
    let orderData;

    //gets transacation info based on what's passed back from successful Square transaction
    Order
        .findTransaction(id)
        .then(data => {
            console.log("HI");
            console.log("in Controller");
            console.log(data.data.transaction.order_id);
            return Order.findOrder(data.data.transaction.order_id);
        })
        .then(data => {
            console.log("HEY");
            console.log(util.inspect(data));
            orderData=data.data.orders[0];
            orderData.delivery="";
            if (delivery === 'delivery') {
                orderData.delivery = "Your order will be delivered in 3-5 business days"
            } else {
                orderData.delivery = "Your order will be available to be picked up by noon of the following business day.  We will email you when it is ready."
            }
            orderData.total_money.amount /= 100;
            orderData.line_items.map(item => {
                item.total_money.amount /= 100;
            })
            console.log(util.inspect(orderData));
            return Trello.addPie(orderData);
        })
        .then(data => {
            console.log("SUP");
            res.render('confirm', orderData);
        })
});

//connected to port confirmation
app.listen(PORT, () => console.log('Server listening on port', PORT));