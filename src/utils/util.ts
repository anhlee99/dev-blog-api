import { Request } from 'express';

export class Util {
  static getFullUrl(req: Request) {
    return `${req.protocol}://${req.get('Host')}`;
  }
}