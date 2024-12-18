const adminAuth = (req, res, next) => {
  const token = "xyzToken"; // ideally we get it from req.body.token
  const isAuthorized = token === "xyzToken";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("unauthorized to access");
  }
};

const userAuth = (req, res, next) => {
  const token = "xyzToken"; // ideally we get it from req.body.token
  const isAuthorized = token === "xyzToken";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("unauthorized to access");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
