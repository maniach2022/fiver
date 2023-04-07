let memcached = require("memcached");
let memcache = new memcached("127.0.0.1:11211");

const init = async () => {
  return new Promise((resolve, reject) => {
    //console.log("hello");
    memcache.flush(function (err) {
      if (err) {
        console.log("Error flushing Memcache:", err);
        reject(err);
      } else {
        console.log("Memcache flushed successfully.");
        //test();
        resolve(true);
      }
    });
  });
};

const getMem = (str) => {
  return new Promise((resolve, reject) => {
    memcache.get(str, function (err, data) {
      console.log("Memcache get");
      resolve(data);
    });
  });
};

const setMem = (str, value) => {
  return new Promise((resolve, reject) => {
    memcache.set(str, value, 3600, function (err) {
      if (!err) {
        console.log("Memcache set");
        resolve(true);
      }
    });
  });
};

module.exports = {
  init,
  getMem,
  setMem,
};
