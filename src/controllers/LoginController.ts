import { Request, Response } from 'express';
import path from 'path';
import { get, post, controller, bodyValidator } from './decorators';

const validEmail = 'hi@hi.com';
const validPassword = 'pass';
const relativePath = '../../src/static/';

@controller('/auth')
export class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    console.log(__dirname);
    res.sendFile(path.resolve(__dirname, relativePath, 'login.html'));
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (email === validEmail && password === validPassword) {
      req.session = { isLoggedIn: true };
      res.redirect('/');
    } else {
      res.redirect('login-failed');
    }
  }

  @get('/login-failed')
  getLoginFailed(req: Request, res: Response): void {
    res.sendFile(path.resolve(__dirname, relativePath, 'login-failed.html'));
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}
