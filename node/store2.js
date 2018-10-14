// //const knex = require('knex')(require('./psqlconnheroku')); // getting database connection
// var dotenv = require('dotenv');
// dotenv.load();
// var fs = require('fs');
// var cloudinary = require('cloudinary').v2;
// var uploads = {};

// cloudinary.uploader.upload('pizza.jpg',{tags:'basic_sample'},function(err,image){
//     console.log();
//     console.log("** File Upload");
//     if (err){ console.warn(err);}
//     console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
//     console.log("* "+image.public_id);
//     console.log("* "+image.url);
//     waitForAllUploads("pizza",err,image);
//   });
  
  

const knex = require('knex')(require('./psqlconnheroku')); // getting database connection


module.exports = {
    // create a user with a full name
    recruiterJobs ({ ID }) {
      //return knex.select('Positions').from('Recruiter').where('ID',ID)
      return knex.select('Positions').from('Recruiter').where('ID', ID)
    },

    recruiterName({ ID }){
        return knex.select('FullName').from('Recruiter').where('ID', ID)
    }


}