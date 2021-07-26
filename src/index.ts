import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['keys'] }));
app.use(AppRouter.getInstance());

app.listen(port, (): void => {
  console.log(`Server started on port ${port}...`);
});
