const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "bike-store",
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2ngay
    },
  };
}

module.exports = {
  createSessionConfig: createSessionConfig,
};
