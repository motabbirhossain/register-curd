import session from 'express-session';

// Middleware for session handling
export const sessionMiddleware = session({
  secret: 'hello there',
  saveUninitialized: true,
  resave: false
});
