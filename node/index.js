const express = require('express'); // express.js web application framework for HTTPS requests
const bodyParser = require('body-parser'); // parse incoming request bodies
const cors = require('cors'); // allows cross domain requests

const store = require('./store'); // store file will be used to define functions

const app = express();
app.use(cors());
app.use(express.static('public')); // ???????????????????????????
app.use(bodyParser.json());


/*const knex = 
console.log(process.env.PORT); // print port to console
if(process.env.PORT === undefined){
    const knex = require('knex')(require('./psqlconn')); // getting database connection
}
else{
    const knex = require('knex')(require('./psqlconnheroku')); // getting database connection
}
console.log(knex);
*/
app.get('/createUser', (req, res) => {
	store.createUser({
		//FullName: req.body.FullName
	})
	.then((data =>{ res.send(data);})) // 200 is HTTP for successful
});

// added process.env.PORT because Heroku dynamically chooses a port to listen to
app.listen(process.env.PORT || 7555, () => {
	console.log('Server running!');
});