const { Pool } = require("pg");

module.exports = app => {
  return new Pool({
    user: app.get("PG_USER"),
    password: app.get("PG_PASSWORD"),
    database: app.get("PG_DB"),
    host: app.get("PG_HOST"),
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 3000
  });
};
