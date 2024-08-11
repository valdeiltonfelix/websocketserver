const pg  = require('pg')
require('dotenv').config();

function Client(){
	const pool = new pg.Pool({
	  user:      process.env.DB_USER,
	  database:  process.env.DB_DATABASE,
	  password:  process.env.DB_PASSWORD,
	  port:      process.env.DB_PORTA,
	  host:      process.env.DB_HOST,
	})
return pool;
}




module.exports = { Client };