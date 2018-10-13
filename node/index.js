var http = require('http'); // module similar to JS libraries
var dt = require('./myfirstmodule');

http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("The date and time are currrently: " + dt.myDateTime());
	res.end('\nHello World!');
	// added process.env.PORT because Heroku dynamically chooses a port to listen to
}).listen(process.env.PORT || 8080) // listens for port 8080 and runs when port is accesssed