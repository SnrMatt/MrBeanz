const userAuthToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  next();
};

module.exports = {
  userAuthToken,
};
