/*
 * random demo pictures app
 */

/* Port which provided by BAE platform */
var port = process.env.APP_PORT || 3001;

/*
 * Create an HTTP server
 *
 */

var express = require('express');
var fs = require("fs");
var app = express();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.use("/assets", express.static(__dirname + '/assets'));
});

app.get('/', function(req, res){
  //res.send('随机Demo图片服务器!');
  res.render('index.jade');
});

app.get('/img/:size?', function(req, res){
  var f2eimg = require('./mods/f2eimg.js');

  var files = fs.readdirSync(__dirname + '/images');
  var index = Math.floor((Math.random() * files.length));

  fs.readFile(__dirname + '/images/' + files[index], function(err, buffer){
    var reg = /\d+x\d+/,
        size,
        width,
        height;

    if(reg.test(req.params.size)){
      size = req.params.size.split('x');
      width = size[0];
      height = size[1];
    } else {
      width = 300;
      height = 300;
    }

    f2eimg(res, buffer, width, height);
  });
});

app.listen(port);

