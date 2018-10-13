const knex = require('knex')(require('./psqlconn')); // getting database connection

module.exports = {
    // create a user with a full name
    createUser ({ }){//FullName }) {
      //console.log('Add user ' + FullName);
      return knex('Applicant').select('ResumeLink');//.where('FullName', 'Tunak Tun');
      //return Promise.resolve();
    }
}