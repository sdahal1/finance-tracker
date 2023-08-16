/**
 * Express API error handler.
 */
function errorHandler(error, request, response, next) {
  console.log("error handler hittin", error)
  if(error.status === 400){
    return response.status(400).json({error})
  }else{
    const { status = 500, message = "Something went wrong!" } = error;
    return response.status(status).json({ error: message });
  }
}

module.exports = errorHandler;
