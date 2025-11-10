// middlewares/error-handler.ts
import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    const statusCode = err.statusCode || 500

    const message =
        statusCode >= 500
            ? 'На сервере произошла ошибка'
            : 'Некорректный запрос'

    if (process.env.NODE_ENV !== 'production') {
        console.error('[ERROR]', err)
    } else {
        console.error(`[ERROR ${statusCode}] ${err.message || 'unknown'}`)
    }

    res.status(statusCode).json({ success: false, message })

    next()
}

export default errorHandler
