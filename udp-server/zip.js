const zlib = require("zlib");

let gzip = (val) => {
  return new Promise((resolve, reject) => {
    zlib.gzip(val, (err, buffer) => {
      if (!err) {
        // console.log(buffer.toString('hex'));
        resolve(buffer);
        //return this
      } else {
        console.log(err);
        reject(err);
      }
    });
  });
};

let gunzip = (val) => {
  return new Promise((resolve, reject) => {
    zlib.gunzip(val, (err, buffer) => {
      if (!err) {
        // console.log(buffer.toString('hex'));
        resolve(buffer);
        //return this
      } else {
        console.log(err);
        reject(err);
      }
    });
  });
};

module.exports = {
  gzip,
  gunzip,
};
