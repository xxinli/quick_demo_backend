import express from 'express';
import { dbService } from '../../services';
import { pathOr } from 'ramda';

export const searchRouter = express.Router();

const getSearchInfo = async (req: express.Request, res: express.Response) => {
    try {
        const db = new dbService();
        const result = await db.getCompanyInfo(pathOr('N/', ['query', 't'], req) as string);
        res.send({
            items: result
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}


// access token check
const accessTokenMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  next();
}

searchRouter.route('/')
  .get(accessTokenMiddleware, getSearchInfo);

  