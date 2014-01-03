/*
 * f2eimg
 * https://github.com/lemonroot/f2eimg
 *
 * Copyright (c) 2013 lemonlwz
 * Licensed under the MIT license.
 */

'use strict';


var gm = require('gm');


function F2eimg(res, dataBuffer, width, height, callback) {
  var w, h, l, t;

  //if (!(this instanceof F2eimg)) return new F2eimg(res, dataBuffer, width, height, callback);

  gm(dataBuffer)
  .size(function (err, size) {
    var ratio = size.width/size.height;
    var toRatio = width/height;
    var newImg;
    if(width>size.width || height>size.height){
      newImg = gm(width, height, "#fd810e");
    } else {
      if(ratio > toRatio){
        h = height;
        w = h * ratio;
        l = (w-width)/2;
        t = 0;
      } else {
        w = width;
        h = w / ratio;
        l = 0;
        t = (h-height)/2;
      }
      newImg = this.resize(w, h)
               .crop(width, height, l, t);
    }
    newImg.font('arial')
    .fill('#FFF')
    .drawText(5, 5, width + 'x' + height, 'SouthEast')
    .stream('png', function (err, stdout, stderr) {
      stdout.pipe(res);
      callback&&callback();
    });
  });
}


module.exports = F2eimg;

