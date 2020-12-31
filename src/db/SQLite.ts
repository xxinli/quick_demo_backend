import sqlite3 from 'sqlite3';
import { isEmpty } from 'ramda';

sqlite3.verbose();

const COMPANY_INFO_QUERY = `select swsCompany.id, swsCompany.name, swsCompany.unique_symbol, swsCompany.exchange_symbol, 
latest.price, swsCompanyScore.total from ( 
    Select price, company_id from (select price,company_id, row_number() over (partition by company_id order by date desc) num from swsCompanyPriceClose
) where num = 1 ) as latest inner join swsCompany on swsCompany.id = latest.company_id 
inner join swsCompanyScore on swsCompany.id = swsCompanyScore.company_id`

export class SQLite3 {
    private readonly path;
    private db: sqlite3.Database | null;
    private static instance: SQLite3 | null;
    constructor(dbPath: string) {
        this.path = dbPath;
        this.db = null;
    }

    private async connectDB (keepTryAfterFail: boolean = false): Promise<sqlite3.Database | null> {
        return new Promise((resolve, reject) => {
            const database = new sqlite3.Database(this.path, (error) => {
                if (error) {
                    console.error('Can not connect to DB', error);
                    if (keepTryAfterFail) {
                        return setTimeout(this.connectDB, 2000);// Retry when connection fails
                    }
                    return reject(null) ;
                } else {
                    console.log('---- DB Connected ---');
                    resolve(database);
                }
            })
        });
    }

    public static async initDB(): Promise<SQLite3 | null> {
        if (!this.instance) {
            this.instance = new SQLite3('./sws.sqlite3');
            this.instance.db = await this.instance.connectDB(true);
        }

        return this.instance
    }
    
    static async closeDB () {
        return new Promise((resolve, reject) => {
            this.instance?.db?.close((err) => {
                if (err) {
                    console.log('Error in db close', err);
                    reject(err);
                } else {
                    console.log('---- DB Closed ---');
                    resolve(true);
                }
            })
        });
    }
    
    async getPricesByCompanyId(companyId: string) {
        return new Promise((resolve, reject) => {
            this.db?.all('select * from swsCompanyPriceClose where company_id = ? order by date desc',
            [ companyId ], (err, rows) =>{
                if (err) {
                    console.log('Error running sql getPricesByCompanyId: ' + companyId);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }


    async getCompanyInfo(extraText = '') {
        return new Promise((resolve, reject) => {
            let filterText = '';
            if (!isEmpty(extraText)) {
                filterText = Number(extraText) ? ` where total = ${extraText}` : ` where unique_symbol LIKE \'%${extraText}%\'`;
            }

            this.db?.all(COMPANY_INFO_QUERY.concat(filterText, ';'), [], (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + COMPANY_INFO_QUERY);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        });
    }
}
