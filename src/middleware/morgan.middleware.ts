import morgan from 'morgan';
import logger from '../utils/logger.js';
import { type Request, type Response } from 'express';

const morganMiddleware = morgan(
  (tokens, req: Request, res: Response) => {
    // Return a JSON string for structured logging
    return JSON.stringify({
      method: tokens.method?.(req, res),
      url: tokens.url?.(req, res),
      status: tokens.status?.(req, res),
      responseTime: `${tokens['response-time']?.(req, res)}ms`,
      'aaa': 'bbb',

      'content-length': tokens.res?.(req, res, 'content-length'),
      'user-agent': tokens['user-agent']?.(req, res),
    });
  },
  {
    stream: {
      write: (message: string) => {
        // Pipe the message from Morgan to the Winston logger
        logger.info(message.trim());
      },
    },
  },
);

export default morganMiddleware;