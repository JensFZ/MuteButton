// server.js

// Setup
var express  = require("express");
var app      = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var morgan   = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var conf = require("./config.json");


// conf
app.use(express.static(__dirname + "/public"));                 // set the static files location /public/img will be /img for users
//app.use("/bower_components",  express.static(__dirname + "/bower_components"));
app.use(morgan("dev"));                                         // log every request to the console
app.use(bodyParser.urlencoded({"extended":"true"}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(methodOverride());

// wenn der Pfad / aufgerufen wird
app.get("/", function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + "/public/index.html");
});

io.sockets.on("connection", function (socket) {
	var addedUser = false;

	// der Client ist verbunden
	socket.on("add user", function(username) {
		if (addedUser) {
			return;
		}

		addedUser = true;
		socket.username = username;
		console.log("user " + username + " connected");
	});

	socket.emit("chat", { zeit: new Date(), text: "Du bist nun mit dem Server verbunden!" });
	// wenn ein Benutzer einen Text senden
	socket.on("chat", function (data) {
		// so wird dieser Text an alle anderen Benutzer gesendet
    console.log("Name: " + data.name + " Text: " + data.text);
		io.sockets.emit("chat", { zeit: new Date(), name: data.name || "Anonym", text: data.text });
	});
});

// listen (start app with node server.js) ======================================
server.listen(conf.port);
console.log("App listening on port " + conf.port);
