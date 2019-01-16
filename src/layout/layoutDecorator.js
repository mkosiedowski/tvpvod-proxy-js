module.exports = function layoutDecorator(req, res, next) {
  res.locals.layout = req.query.nolayout == null ? "layout" : "";
  next();
};
