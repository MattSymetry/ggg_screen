let express = require("express");
let cors = require("cors");
const bodyParser = require('body-parser');
let app = express();
let http = require("http");
let server = http.createServer(app);

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/data"));

const regExp = new RegExp("[a-z0-9\.-_]*@stud.hslu.ch$", "i");

app.get("/v1/requestUpload", function (req, res) {
    // Check if req.body is empty
    console.log(req.body)
    if (Object.keys(req.body).length === 0 || !('email' in req.body)) {
        res.status(406).send(JSON.stringify({message: "No data"}));
        return;
    }
    // Check if valid email
    const data = req.body;
    if(!data.email.match(regExp) || !data.email.endsWith("stud.hslu.ch")) {
        res.status(403).send(JSON.stringify({message: "Invalid Email"}));
        return;
    }

    // Create new entry

    // Send email

    res.status(200).send(JSON.stringify({message: "Accepted", email: data.email}));
    return;
});

/**
 * Server
 */
 server.listen(8081, () => {
    console.log("listening on *:8081");
});