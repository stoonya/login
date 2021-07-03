import { Request, Response, Router } from 'express';
import path from 'path';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

export const router = Router();
const relativePath = '../../src/static';
const validEmail = 'hi@hi.com';
const validPassword = 'pass';

router.get('/login', (req: RequestWithBody, res: Response): void => {
  res.sendFile(path.resolve(__dirname, relativePath, 'login.html'));
});

router.post('/login', (req: RequestWithBody, res: Response): void => {
  const { email, password } = req.body;

  if (areCredsValid(email, password)) {
    req.session = { isLoggedIn: true };
    res.redirect('/');
  } else {
    res.redirect('/login-failed');
  }
});

router.get('/login-failed', (req: RequestWithBody, res: Response): void => {
  res.sendFile(path.resolve(__dirname, relativePath, 'login-failed.html'));
});

router.get('/', (req: RequestWithBody, res: Response): void => {
  if (req.session && req.session.isLoggedIn) {
    res.sendFile(
      path.resolve(__dirname, relativePath, 'homepage-while-logged-in.html')
    );
  } else {
    res.sendFile(
      path.resolve(__dirname, relativePath, 'homepage-while-logged-out.html')
    );
  }
});

router.get('/logout', (req: RequestWithBody, res: Response): void => {
  req.session = undefined;

  res.sendFile(path.resolve(__dirname, relativePath, 'login.html'));
});

router.get('/protected', (req: RequestWithBody, res: Response): void => {
  if (req.session && req.session.isLoggedIn) {
    res.sendFile(
      path.resolve(
        __dirname,
        relativePath,
        'protected-page-while-logged-in.html'
      )
    );
  } else {
    res.sendFile(
      path.resolve(
        __dirname,
        relativePath,
        'protected-page-while-logged-out.html'
      )
    );
  }
});

const areCredsValid = (
  email: string | undefined,
  password: string | undefined
): boolean => {
  if (email && password && email === validEmail && password === validPassword) {
    return true;
  }
  return false;
};
