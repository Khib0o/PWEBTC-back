// This imports the mysql library
const mysql = require("mysql");
const FileReader = require('filereader');
const fapi = require('file-api');
const File = fapi.File;

// Prepare to connect to MySQL with your secret environment variables
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "ynot6803",
    database: "pmanager",
    multipleStatements:true
});




function getAllFiles(limit = 100) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM files`;
        pool.query(sql, [limit], function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

function getAllUsers(limit = 100) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users`;
        pool.query(sql, [limit], function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

function AddFile(limit = 100) {
    let reader = new FileReader(); // no arguments
    console.log(reader.readAsText(new File('./test.txt')).results);
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO files (Name, DateLastModif, IdOwner) VALUES ('test', '2022-03-15 18:42:42',1);
                    UPDATE files SET File=`+toString(new File("test.txt"))` WHERE IdFile=1;`;
        pool.query(sql, [limit], function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}


function AddUser(req) {
    return new Promise((resolve, reject) => {
        var sql = `INSERT IGNORE INTO users (name, token, id, email, url)VALUES(?,? ,? ,? ,?)`;
        
        pool.query(sql, [req.body.name ,req.body.token.slice(0,400), req.body.id, req.body.email, req.body.url] ,function (err, results) {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
        
    });
}


function insertPath(req){
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO images (path, name)VALUES(?, ?)`;
        console.log("insertion done");
        pool.query(sql, [req.path, req.body.name],function (err, results) {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
        
    });
}


function getUserInfo(req) {
    let token = req.headers.authorization.slice(0,400);
    console.log("");
    console.log(token);
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM users WHERE token = '${token}' ` ;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
}

function getProjetByUser(req) {
    let token = req.headers.authorization.slice(0,400);
    console.log(token);

    return new Promise((resolve, reject) => {
        var sql = `SELECT projects.IdProjects, projects.Name, projects.IdOwner FROM projects, users WHERE projects.IdOwner = users.IdUser HAVING (SELECT IdUser FROM users WHERE users.token = '${token}')` ;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
}
    
function getUserInfo(req) {
    let token = req.headers.authorization.slice(0,400);
    console.log("");
    console.log(token);
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM users WHERE token = '${token}' ` ;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
}

function addUserToProject(req){
    let email = req.body.email;
    let IdProjects = req.body.IdProjects;

    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO associationproject (IdProjects, IdUser) SELECT ${IdProjects}, users.IdUser FROM users WHERE email = '${email}'`;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
        
    });
}

function removeUserToProject(req) {
    let email = req.body.email;
    let IdProjects = req.body.IdProjects;

    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM associationproject WHERE IdProjects = ${IdProjects} AND IdUser IN (SELECT IdUser FROM users WHERE users.email = '${email}')`;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
        
    });
}

function getMembersOfProject(req){
    let IdProjects = req.body.IdProjects;

    return new Promise((resolve, reject) => {
        var sql = `SELECT users.email FROM users, associationproject WHERE associationproject.IdProjects = ${IdProjects} AND users.IdUser = associationproject.IdUser `;
        pool.query(sql ,function (err, results) {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
        
    });
}




function DeleteFile(req) {
    return new Promise((resolve, reject) => {
        const sql = `Delete from files where IdFile = ${req.body.fileid};`;
        //const sql = `Select FilePath from files where IdFile = ${req.body.fileid};Delete from files where IdFile = ${req.body.fileid};`;
        pool.query(sql, function (err, results) {
            if (err) {
                return reject(err);
            }            
            return resolve(results);
        });
    });
}

// Export the functions so other modules/files can use them
module.exports = {
    getAllFiles,
    getAllUsers,
    AddFile,
    AddUser,
    getUserInfo,
    getProjetByUser,
    insertPath,
    addUserToProject,
    removeUserToProject,
    getMembersOfProject,
    pool,
    DeleteFile
};
