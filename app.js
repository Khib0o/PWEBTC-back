// This loads the settings from your `.env` file.
require("dotenv").config();

const cors = require('cors');
const express = require("express");
const app = express();
const db = require("./serv/database");
const db2 = require("./src/models");
const initRoutes = require("./src/routes/web");
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
db2.sequelize.sync();
global.__basedir = __dirname;



const PORT = 3333;

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

////////////
// Routes //
////////////

// The home page lists some available URLs.
app.get("/", (req, res) => {
    res.json({
        urls: {
            get_all_files: `localhost:${PORT}/api/files`,
            get_all_users: `localhost:${PORT}/api/users`,
            add_a_file: `localhost:${PORT}/api/new`
        },
    });
});

//Get all files
app.get("/api/files", (req, res) => {
    db.getAllFiles()
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
});

//Get all users
app.get("/api/users", (req, res) => {
    console.log(req);
    db.getAllUsers()
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
});

//Add a file
app.post("/api/upload", (req, res) => {
    console.log(req.body);
    db.AddFile()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
});


app.post('/api/register', (req,res,next) => {
    //console.log(req.body);
    db.AddUser(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
});

app.get('/api/getUser', (req,res,next) => {
    db.getUserInfo(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})


app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
