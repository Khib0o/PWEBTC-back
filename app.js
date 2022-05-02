// This loads the settings from your `.env` file.
require("dotenv").config();


const express = require("express");
const app = express();
const db = require("./serv/database");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
global.__basedir = __dirname;

const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));




////////////
// Routes //
////////////

app.post('/api/upload', multipartMiddleware, (req, res) => {
    res.json({
        'message': 'File uploaded successfully'
    });
});


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
