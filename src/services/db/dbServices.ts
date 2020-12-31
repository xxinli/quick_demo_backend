import { SQLite3 } from '../../db';
export class dbService {
  async getPricesByCompanyId(companyId: string) {
    try {
      const db = await SQLite3.initDB();
      return db?.getPricesByCompanyId(companyId);
    } catch (err) {
      throw err;
    }
  }

  async getCompanyInfo(text?: string) {
    try {
      const db = await SQLite3.initDB();
      return db?.getCompanyInfo(text);
    } catch (err) {
      throw err;
    }
  }
}