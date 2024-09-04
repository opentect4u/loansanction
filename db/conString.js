require('dotenv').config()

// CONNECTION STRING FOR ORACLE DB
module.exports = {
  1: {
    user: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_PASS,
    connectionString: process.env.CONTROLS_URL,
    poolMax: 5,
    poolMin: 5,
    poolIncrement: 0,
  },
};
