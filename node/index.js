const express = require('express'); // express.js web application framework for HTTPS requests
const bodyParser = require('body-parser'); // parse incoming request bodies

const store = require('./store'); // store file will be used to define functions

const app = express();
app.use(express.static('public')); // ???????????????????????????
app.use(bodyParser.json());

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