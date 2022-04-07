module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "3151699a46",
    DB: "testdbe",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };