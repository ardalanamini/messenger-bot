const Server = require("mongodb-memory-server");

const DB_NAME = "test";

const MONGOD = new Server.default({
  autoStart: false,
  binary: {
    version: "4.2.7",
  },
  instance: {
    dbName: DB_NAME,
    storageEngine: "wiredTiger",
  },
});

module.exports = async () => {
  await MONGOD.start();

  global.__CONNECTION__ = await MONGOD.getConnectionString();
  global.__DB_NAME__ = DB_NAME;
  global.__MONGOD__ = MONGOD;
};
