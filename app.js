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


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

////////////
// Routes //
////////////

/*const file = "" ;
app.post('/api/download', function(req, res,next){
    console.log("download");
    console.log(req.body.name);
    file == `${__dirname}/uploads/${req.body.name}`

    console.log("done");
    //res.json({reponse :'DOWNLOADED'});
    next()
  });*/

  app.get('/api/download/:filename', function(req, res){
    const file = `${__dirname}/uploads/`+req.params.filename;
    res.download(file); // Set disposition and send it.
  });


var fs = require('fs');
app.post('/api/upload', multipartMiddleware, (req, res) => {
    //console.log(req.files.file);
    //console.log(req.files.file.path);
    //console.log(`${__dirname}/uploads/`+replace(req.files.file.path));
    db.insertPath(req)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
    fs.rename(`${__dirname}/uploads/`+replace(req.files.file.path),`${__dirname}/uploads/`+req.body.name, (error) => {
        if (error) {
            console.log(error);
          }
          else {
            console.log("\nFile Renamed\n");
          }
    });
});

function replace(str){
    res = str.replace('uploads\\','');
    return res;

}

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
app.post("/api/files", (req, res) => {
    console.log(req.body);  
    db.getAllFiles(req)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
});

app.post('/api/createNewProject', (req,res,next) => {
    console.log("Demande create recue");
    db.createNewProject(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})

//Get all users
app.get("/api/users", (req, res) => {
    console.log(req);
    db.getAllUsers()
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
});


app.post('/api/register', (req,res,next) => {
    console.log(req.body);
    db.AddUser(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
});

app.get('/api/getUser', (req,res,next) => {
    db.getUserInfo(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})

app.get('/api/getProjectbyUser', (req,res,next) => {
    db.getProjetByUser(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})

app.post('/api/addUserToProject', (req,res,next) => {
    console.log(req.body);
    
    db.addUserToProject(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    
})

app.post('/api/removeUserToProject', (req,res,next) => {
    console.log(req.body);
    
    db.removeUserToProject(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    
})

app.post('/api/getMembersOfProject', (req,res,next) => {
    db.getMembersOfProject(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})


app.post('/api/deletefiles', (req,res,next) => {
    db.DeleteFile(req)
    .then(data => {        
        /*if(data[0][0].FilePath)
        {
            var fs = require('fs');
            var path = '.\\'+data[0][0].FilePath;
            fs.unlink(path, (err) => {
                if (err) throw err
            });
        }*/
        res.status(200).json(data);
      })
    .catch(err => res.status(500).json(err)); 
})

app.post('/api/sendContactInfo', (req,res,next) => {
    console.log(req.body);
    db.SendContactInfo(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
});

app.get('/api/getLatestProjectByUser', (req,res,next) => {
    db.getLatestProjectByUser(req)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
})


app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
