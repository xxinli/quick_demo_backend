import { SQLite3 } from '../db';

const companyResolver = async (parent: any, args: any, context: any, info: any) => {
  info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PRIVATE' });
    const companyId = args.keyWord || '';
    // const db = await SQLite3.initDB();
    console.log('companyId', companyId)
    const result = await context.db?.getCompanyInfo("");
    console.log('companyId', companyId)
    console.log('result', result)
    return ['companyResolver'];
};
const priceResolver = () => ['priceResolver'];
const scoreResolver = () => ['scoreResolver'];

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
      company: companyResolver,
      price: priceResolver,
      score: scoreResolver
    }
};

