/*
console.log(process.env.PORT); // print port to console
if(process.env.PORT === undefined){
    const knex = require('knex')(require('./psqlconn')); // getting database connection
}
else{*/
    const knex = require('knex')(require('./psqlconnheroku')); // getting database connection
//}


module.exports = {
    // create a user with a full name
    createUser ({ }){//FullName }) {
      //console.log('Add user ' + FullName);
      return knex('Applicant').select('ResumeLink');//.where('FullName', 'Tunak Tun');
      //return Promise.resolve();
    }
}