var express        = require('express')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
    , fs = require('fs');

var async = require('async');


var app = express()

//app.set('views', __dirname + '/views')
//app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())


app.post('/submit', function(res, rep) {
    fs.writeFile('info/' + res.body.name, JSON.stringify(res.body), function(err){
        if (err) {
            rep.status(500).send(err);
        } else {
            rep.status(201).end();
        }
    })
});

app.get('/people', function(res, rep) {
    fs.readdir('info', function(err, files){
        if (err) {
            rep.status(500).send(err);
        } else {
            var res = [];
            async.eachLimit(files, 10, function(f, cb) {
                fs.readFile('info/' + f, 'utf-8', function(err, data){
                    res.push(JSON.parse(data));
                    cb(err);
                });
            }, function(err) {
                rep.status(200).send(res);
            });

        }
    })
});

app.use(express.static(path.join(__dirname, 'public')))


// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}
var server = app.listen(process.env.PORT || 9001 , function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
