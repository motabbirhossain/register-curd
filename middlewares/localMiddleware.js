

export const localMiddleware = (req, res, next) => {
  res.locals.message = req.session?.message || '';
  res.locals.user = req.session?.user || '';
  req.session.message = null;
  next();
}