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
    database: "dropbox"
});

function getAllFiles(limit = 100) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM files,users WHERE files.IdOwner = users.IdUser`;
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
        var sql = `INSERT INTO users(token, IdUser, name, url, email)VALUES(?, ?, ?, ?, ?)`;
        pool.query(sql, [req.body.token, req.body.id, req.body.name, req.body.url, req.body.email] ,function (err, results) {
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
    AddUser
};
