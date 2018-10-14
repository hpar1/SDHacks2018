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
    // create a user with a full name
    createUser ({ }){//FullName }) {
      //console.log('Add user ' + FullName);
      return knex('Applicant').select('ResumeLink');//.where('FullName', 'Tunak Tun');
      //return Promise.resolve();
    }
}