/*
console.log(process.env.PORT); // print port to console
if(process.env.PORT === undefined){
    const knex = require('knex')(require('./psqlconn')); // getting database connection
}
else{
    *///const knex = require('knex')(require('./psqlconnheroku')); // getting database connection
//}
//import {knex} from './index';
const knex = require('knex')(require('./psqlconn')); // getting database connection
//const knex = (process.env.PORT === 'undefined' ? require('knex')(require('./psqlconn')) : require('knex')(require('./psqlconnheroku')));
//console.log(knex);
module.exports = {
    // load applicants that Applied to the desired Position
    loadApplicants ({ Position }) {
      console.log('Searching for Applicants with position: ' + Position);
      let pos = "%" + Position + "%"; // looks for keyword in any point of string (% are wildcard char)
      //console.log(pos);
      //return knex('Applicant').where('AppliedTo', 'like', pos);
      //   let test = knex('Applicant').select('ID', knex.raw('array_to_json(PositionsAppliedTo) as addresses_json'));
      //   console.log(test);
      //return knex('Applicant').all('PositionsAppliedTo', Position);
      //return knex('Applicant').raw
      return knex('Applicant').where('AppliedTo', 'like', pos); // fix later to be from array
    },

    results ({ ID, Job }){   
        return knex('JobAppList').select('Accepted').where('RecruiterID', ID).where('JobType',Job)
            .then(([Acceptees]) => {
                console.log(Acceptees.Accepted);
                const nums = Acceptees.Accepted.split(","); // split into array
                return knex('Applicant').whereIn('ID', nums);
            })
    }
    
}