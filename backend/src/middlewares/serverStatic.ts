//middlewares/serverStatic.ts
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function serveStatic(baseDir: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        let filePath = path.normalize(path.join(baseDir, req.path))

        if (
            !filePath.startsWith(path.resolve(baseDir) + path.sep) &&
            filePath !== path.resolve(baseDir)
        ) {
            return next()
        }

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                return next()
            }

            res.sendFile(filePath, (err) => {
                if (err) next(err)
            })
        })
    }
}
