import express from 'express';
import { dbService } from '../../services';

export const companyRouter = express.Router();

const getCompanyInfo = async (req: express.Request, res: express.Response) => {
    try {
        const db = new dbService();
        const result = await db.getCompanyInfo();
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

companyRouter.route('/')
  .get(accessTokenMiddleware, getCompanyInfo);

  