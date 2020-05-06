const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
require('./database/mySqlConnection')
require('./config/passport');
const morgan = require('morgan');

const mongoPool = require('./database/mongoDbConnection')
const mysqlPool = require('./database/mySqlConnection')

// const redis = require('redis')
// const REDIS_PORT =  process.env.PORT || 6379
// module.exports = client = redis.createClient(REDIS_PORT)

const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.static(path.join(__dirname, '/public'))); // specify the path of static directory
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/public', express.static('public'));

// mongo and mysql connection pool
mongoPool
mysqlPool

// route handlers

<<<<<<< HEAD
// require('./routes/seller/xyz')(app);
app.use('/product', require('./routes/products'))
// app.use('/user', require('./routes/cart'))
// app.use('/saveForLater', require('./routes/saveForLater'))
=======
app.use('/product', require('./routes/products'))
app.use('/user', require('./routes/cart'))
app.use('/saveForLater', require('./routes/saveForLater'))
>>>>>>> 140922ccd097f50e20046b8ff2e1e0f8936c8719

app.use('/product', require('./routes/products'))
app.use('/user', require('./routes/cart'))
app.use('/saveForLater', require('./routes/saveForLater'))

app.use('/signUp', require('./routes/signUp'));
app.use('/signin', require('./routes/signin'));
app.use('/createOrder', require('./routes/customerOrder')); // temp name, must be changed
app.use('/order', require('./routes/order'));
app.use('/address', require('./routes/address'));
app.use('/card', require('./routes/card'));
app.use('/seller', require('./routes/seller'));

app.use('/analytics', require('./routes/analytics'));

//redis connection
// client.on("connect", () => {
//   console.log('Your are connected to Redis');
// });

app.listen(3001);
console.log("Server Listening on port 3001")
module.exports = app;