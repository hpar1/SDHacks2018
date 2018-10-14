//Knex.js is a SQL query builder
//connect to PostgreSQL database
module.exports = {
    client: 'pg',
    version: '7.2',
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      port: process.env.port,
      ssl: true
    }
}