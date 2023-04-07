const Cache = require("memcached-promisify");
const cache = new Cache();

module.exports = {
  cache,
};