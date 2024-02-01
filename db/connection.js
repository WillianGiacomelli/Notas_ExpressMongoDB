const { mongoClient, MongoClient } = require("mongodb");
const { MONGO_DB_URI } = require("./env");
const url = MONGO_DB_URI;

let _db;

const initiateDb = (cb) => {
  MongoClient.connect(url)
    .then((client) => {
      _db = client;
      cb(null, _db);
    })
    .catch((error) => {
      cb(error);
    });
};

const getDb = () => {
  return _db;
};

module.exports = {
  initiateDb,
  getDb,
};
