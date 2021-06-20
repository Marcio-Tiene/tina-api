import { Injectable, NestMiddleware } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
@ApiBearerAuth('apikey')
@Injectable()
export class AppHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { API_HEADER_NAME, API_HEADER_SECRET } = process.env;

    try {
      const { headers } = req;
      if (
        headers[API_HEADER_NAME] &&
        headers[API_HEADER_NAME] === API_HEADER_SECRET
      ) {
        return next();
      }

      return res.sendStatus(403);
    } catch (err) {
      res.sendStatus(403);
      console.log(err);
    }
  }
}
