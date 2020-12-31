import express from 'express';
import { homeRouter } from './home';
import { companyRouter } from './company';
import { searchRouter } from './search';

export const apiRouter = express.Router()
apiRouter.use("/home", homeRouter);
apiRouter.use("/company", companyRouter);
apiRouter.use("/search", searchRouter);

