import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { get, controller, use } from './decorators';

const relativePath = '../../src/static/';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.isLoggedIn) {
    next();
    return;
  }

  res.sendFile(
    path.resolve(
      __dirname,
      relativePath,
      'protected-page-while-logged-out.html'
    )
  );
}

@controller('')
export class RootController {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.isLoggedIn) {
      res.sendFile(
        path.resolve(__dirname, relativePath, 'homepage-while-logged-in.html')
      );
    } else {
      res.sendFile(
        path.resolve(__dirname, relativePath, 'homepage-while-logged-out.html')
      );
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.sendFile(
      path.resolve(
        __dirname,
        relativePath,
        'protected-page-while-logged-in.html'
      )
    );
  }
}
