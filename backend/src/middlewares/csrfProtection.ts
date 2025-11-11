// middlewares/csrfProtection.ts
import { NextFunction, Request, Response } from 'express'
import ForbiddenError from '../errors/forbidden-error'
import { CSRF_COOKIE } from '../config'

export default function csrfProtection(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next()
    }

    if (!req.cookies || Object.keys(req.cookies).length === 0) {
        return next()
    }

    const csrfCookie = req.cookies[CSRF_COOKIE.name]
    const csrfHeader = req.get('X-CSRF-Token')

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
        return next(new ForbiddenError('CSRF token mismatch or missing'))
    }

    next()
}
