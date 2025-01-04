import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import ejsLayouts from 'express-ejs-layouts';
import { mongoDbConnection } from './config/db.js';
import {sessionMiddleware} from './middlewares/sessionMiddleware.js'
import {localMiddleware} from './middlewares/localMiddleware.js'
import userRouter from './routes/user.js'
import session from 'express-session';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//setUp session
// app.use(sessionMiddleware);


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Apply Local middleware
app.use(localMiddleware);



// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// EJS Setup
app.set('view engine', 'ejs');
app.set('layout', 'layouts/app');
app.use(ejsLayouts)
app.set('views', path.join(__dirname, 'views'));

app.use('/', userRouter);


// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, '127.0.0.1', () => {
  mongoDbConnection();
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
