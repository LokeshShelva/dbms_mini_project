require('dotenv').config()



// ssl: {
//   rejectUnauthorized: false
// },

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.PROD_HOST,
    database: process.env.PROD_DB,
    user: process.env.PROD_USER,
    password: process.env.PROD_PASSWORD,
    port: process.env.PROD_PORT,
    // port: 5432
    ssl: {
      rejectUnauthorized: false
    }
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};
