// middlewares/csrfProtection.ts
import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../errors/forbidden-error';
import { CSRF_COOKIE } from '../config';

export default function csrfProtection(req: Request, _res: Response, next: NextFunction) {
  const csrfCookie = req.cookies[CSRF_COOKIE.name];
  const csrfHeader = req.get('X-CSRF-Token');

  // Для GET-запросов CSRF не требуется (только для state-changing: POST/PATCH/DELETE)
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return next(new ForbiddenError('CSRF token mismatch or missing'));
  }

  next();
}
