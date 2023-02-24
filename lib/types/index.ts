import type { Request, Response, NextFunction } from 'express'
import { ErrorHandler } from './error'

type ExpressController = (req: Request, res: Response, next: NextFunction) => Promise<void>
type ExpressControllerSync = (req: Request, res: Response, next: NextFunction) => void
type ExpressErrorHandler = (error: ErrorHandler, req: Request, res: Response, next: NextFunction) => void

export { ExpressController, ExpressControllerSync, ExpressErrorHandler }
export * from './error'
