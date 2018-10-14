const express = require('express'); // express.js web application framework for HTTPS requests
const bodyParser = require('body-parser'); // parse incoming request bodies
const cors = require('cors'); // allows cross domain requests

const store = require('./store'); // store file will be used to define functions

const app = express();
app.use(cors());
app.use(express.static('public')); // ???????????????????????????
app.use(bodyParser.json());

//console.log(process.env.PORT);
//const knex = (process.env.PORT === 'undefined' ? require('knex')(require('./psqlconn')) : require('knex')(require('./psqlconnheroku')));
//export {knex};
//console.log(knex);
//console.log(knex);
/*console.log(process.env.PORT); // print port to console
if(process.env.PORT === undefined){
    const knex = require('knex')(require('./psqlconn')); // getting database connection
}
else{
    const knex = require('knex')(require('./psqlconnheroku')); // getting database connection
}
console.log(knex);
*/
app.post('/loadApplicants', (req, res) => {
	store.loadApplicants({
		Position: req.body.Position
	})
	.then((data =>{ res.send(data);})) // 200 is HTTP for successful/ send back response data
});

// added process.env.PORT because Heroku dynamically chooses a port to listen to
app.listen(process.env.PORT || 7555, () => {
	console.log('Server running!');
});