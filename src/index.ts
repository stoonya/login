import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import path from 'path';
import { router } from './routes/login-routes';

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['keys'] }));
app.use(router);

app.listen(port, (): void => {
  console.log(`Server started on port ${port}...`);
});
