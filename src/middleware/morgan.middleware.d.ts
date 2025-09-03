// src/middlewares/morgan.middleware.d.ts

// The 'morgan-json' library types can be referenced here
import { Request, Response } from 'express';

declare module './morgan.middleware.js' {
  const morganMiddleware: (req: Request, res: Response, next: import('express').NextFunction) => void;
  export default morganMiddleware;
}