/**
 * Creates a middleware function that validates that req.body.data has the specified non-falsey properties.
 * @param properties
 *  one or more property name strings.
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has the specified non-falsey properties.
 */
function hasProperties(...properties) {
  return function (req,res, next) {
    const { data = {} } = req.body;

    try {
      const errors = {}
      properties.forEach((property) => {
        const value = data[property];
        if (!value) {
          // const error = new Error(`A '${property}' property is required.`);
          // error.status = 400;
          // errors.push(error);
          // throw error;
          errors[property] = `A '${property}' property is required.`
        }
      });
      if(Object.keys(errors).length){
        errors.status = 400;
        throw errors
      } 
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasProperties;
