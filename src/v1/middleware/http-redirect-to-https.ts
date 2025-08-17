import type { NextFunction, Request, Response } from 'express';

export const httpRedirectToHttps = (req: Request, res: Response, next: NextFunction) => {
  if (req.secure) return next();
  return res.redirect(307, `https://${req.headers.host}${req.url}`);
};
