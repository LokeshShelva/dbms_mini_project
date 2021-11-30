require('dotenv').config()



// ssl: {
//   rejectUnauthorized: false
// },

module.exports = {
  client: 'pg',
  connection: {
    // host: process.env.PROD_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // port: process.env.PROD_PORT,
    // port: 5432
    // ssl: {
    //   rejectUnauthorized: false
    // }
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};
