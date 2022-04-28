module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "ynot6803",
    DB: "dropbox",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };