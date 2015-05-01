// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

//mongoose.connect('mongodb://localhost/marstv');

app.use(express.static(__dirname + '/'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


//  models =====================================================================
var Channel = mongoose.model('Channel', {
    text : String
});




// routes ======================================================================

// api ---------------------------------------------------------------------
// get all posters
app.get('/api/posters', function(req, res) {
    // use mongoose to get all posters in the database
    Channel.find(function(err, channels) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(channels); // return all posters in JSON format
    });
});

// create channel and send back all posters after creation
app.post('/api/posters', function(req, res) {
    // create a channel, information comes from AJAX request from Angular
    Channel.create({
        text : req.body.text,
        done : false
    }, function(err, channel) {
        if (err)
            res.send(err);

        // get and return all the posters after you create another
        Channel.find(function(err, channels) {
            if (err)
                res.send(err)
            res.json(channels);
        });
    });

});

// delete a channel
app.delete('/api/posters/:channel_id', function(req, res) {
    Channel.remove({
        _id : req.params.channel_id
    }, function(err, channel) {
        if (err)
            res.send(err);
        // get and return all the posters after you create another
        Channel.find(function(err, channels) {
            if (err)
                res.send(err)
            res.json(channels);
        });
    });
});

// application -------------------------------------------------------------

//app.all("*", function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//    return next();
//});

app.get('*', function(req, res) {
    res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
   // res.json({ message: 'hooray! welcome to our api!' });
});

// listen (start app with node server.js) ======================================
app.listen(8080,'localhost');
console.log("App listening on port 8080");