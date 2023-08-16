const knex = require("../db/connection");

function list(){
 return knex("movies")
  .select("*")
}

function read(movie_id){
  return knex("movies")
    .select("*")
    .where({movie_id})
    .first();
}


function listShowingMovies(){
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({is_showing:true})
    .distinct()
}


module.exports = {
  list,
  listShowingMovies,
  read
}