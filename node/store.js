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
const crypto = require('crypto'); // to encrypt password
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
    },
    // ID is an email
    // something wrong: TypeError Undefined is not a function
    createUser ({ID, password, name, option}){
        console.log('Add user');

        const {salt, hash} = saltHashPassword({password}); // salt & hash password
        if(option === 'Recruiter'){
            let userType = 'Recruiter';
        }
        else{
            let userType = 'Applicant';
        }
        return knex(option).where('ID', ID)
            .then(([foundUser]) => {
                if(!foundUser){
                    knex(option).insert({salt, encrypted_password: hash, ID, name})
                        .then(([newId]) => {
                            console.log(newId);
                        })
                        return {success: true};
                }
                else return {success: false};
            });
    },

    authenticate({ID, password, option}){
        console.log('Authenticating user');
        if(option === 'Recruiter'){
            let userType = 'Recruiter';
        }
        else{
            let userType = 'Applicant';
        }
        // need to make 'Recruiter' into option so it can switch
        return knex('Recruiter').where('ID', ID)
            .then(([user]) => {
                if(!user) return {success: false};
                const {hash} = saltHashPassword({
                    password,
                    salt: user.salt
                })
                return {success: hash === user.encrypted_password}
            });
        
    }
    
}

// salt and hash password function
function saltHashPassword({password, salt = randomString()}){
    const hash = crypto.createHmac('sha512', salt).update(password);
    return {
        salt,
        hash: hash.digest('hex')
    }
}

// creates a random string
function randomString(){
    return crypto.randomBytes(4).toString('hex');
}