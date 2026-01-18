const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;

// wraps async controller in a promise and catches any rejection,
//  then passes the error to Express using next(err), which sends it to the
//  global error-handling middleware.
// catches errors from async/await functions and calls next(err)
