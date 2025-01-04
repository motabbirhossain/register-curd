/*
  validate
 */

export const validate = (mag, redirect, req, res) => {
  req.session.message = mag;
  res.redirect(redirect);
}