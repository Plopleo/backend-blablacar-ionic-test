var express = require('express'),
    trajets = require('./routes/trajets'),
    utilisateurs = require('./routes/utilisateurs'),
    app = express(),
    mongoose = require('mongoose')
    bodyParser = require('body-parser');

// configuration of Mongoose
var optionsMongoose = {user: 'user', pass: 'pass'};
mongoose.connect('yourMongooseUrlHere', optionsMongoose);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

app.use(express.static('www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/trajets', trajets.findAll);
app.get('/trajets/:id', trajets.findById);
app.post('/trajets', trajets.createTrajet);

app.get('/utilisateurs', utilisateurs.findUserByMailAndPassword)
app.post('/utilisateurs', utilisateurs.createUser);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});