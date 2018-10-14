/*
console.log(process.env.PORT); // print port to console
if(process.env.PORT === undefined){
    const knex = require('knex')(require('./psqlconn')); // getting database connection
}
else{
    *///const knex = require('knex')(require('./psqlconnheroku')); // getting database connection
//}
//import {knex} from './index';
const knex = require('knex')(require('./psqlconnheroku')); // getting database connection
//const knex = (process.env.PORT === 'undefined' ? require('knex')(require('./psqlconn')) : require('knex')(require('./psqlconnheroku')));
//console.log(knex);
module.exports = {
    // load applicants that Applied to the desired Position
    loadApplicants ({ Position }) {
      console.log('Searching for Applicants with position: ' + Position);
      let pos = "%" + Position + "%"; // looks for keyword in any point of string (% are wildcard char)
      console.log(pos);
      return knex('Applicant').where('AppliedTo', 'like', pos);
    }
}