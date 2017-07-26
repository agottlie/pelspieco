const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const Order = require('./services/square');
const util = require('util');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//controller routes
app.use('/order', require('./controllers/orderController'));
app.use('/events', require('./controllers/eventsController'));

//renders the landing page
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/confirm', (req, res) => {
    let id = req.query.transactionId;
    let delivery = req.query.referenceId;

    Order
        .findTransaction(id)
        .then(data => {
            if (delivery === 'delivery') {
                data.data.transaction.order.delivery = "Your order will be delivered in 3-5 business days"
            } else {
            	data.data.transaction.order.delivery = "Your order will be available to be picked up by noon of the following business day.  We will email you when it is ready."
            }
            data.data.transaction.order.total_money.amount /= 100;
            console.log(data.data.transaction.order.total_money.amount);
            data.data.transaction.order.line_items.map (item => {
            	item.total_money.amount /=100;
            })
            console.log(util.inspect(data.data.transaction.order));
            res.render('confirm', data.data.transaction.order);
        })
});

app.listen(PORT, () => console.log('Server listening on port', PORT));