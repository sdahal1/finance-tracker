const { PORT = 5000 } = process.env;

//connect it with app
const app = require("./app");
//connect with database
// const knex = require("./db/connection");
//listen for requests to port
const listener = () => console.log(`Listening on port: ${PORT}`)
//run the latest migrations of db to set up db

app.listen(PORT, listener)