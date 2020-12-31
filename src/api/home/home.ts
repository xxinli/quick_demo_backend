import express from 'express';

export const homeRouter = express.Router();
// TODO: access token check
const accessTokenMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  next();
}

homeRouter.route('/')
  .get(accessTokenMiddleware, (req, res) => {
    res.send({
        description: 'Welcome! Backend is Connected'
    });
  });

