const mysql = require("mysql2/promise");

// const connectMySqlDB = async () => {
//   try {
    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      database: "practical 1",
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    // const poolPromise = pool.promise()

module.exports = pool