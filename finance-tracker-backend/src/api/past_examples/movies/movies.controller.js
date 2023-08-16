const service = require("./movies.service.js");
// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}


async function list(req,res,next){
  const {is_showing} = req.query;
  let data;
  if(is_showing){
    data = await service.listShowingMovies();
  }else{
    data = await service.list();
  }
  res.json({data})
}


async function read(req,res,next){
  const {movieId} = req.params;
  const data = await service.read(movieId);
  res.json({data});
}



module.exports = {
  list,
  read: [movieExists, read],
  movieExists
};
