import * as graphql from 'graphql';
import { dbService } from '../services';

//creacte graphql company object
const CompanyType = new graphql.GraphQLObjectType({
    name: "Company",
    fields: {
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        unique_symbol: { type: graphql.GraphQLString },
        exchange_symbol: { type: graphql.GraphQLString },
        price: { type: graphql.GraphQLFloat },  
        total: { type: graphql.GraphQLFloat }        
    }
});

// query{
//     Prices(id: "46B285BC-B25F-4814-985C-390A4BFA2023") {
//       date,
//       date_created,
//       company_id,
//       price
//     }
//   }
const PriceType = new graphql.GraphQLObjectType({
    name: "Price",
    fields: {
        date: { type: graphql.GraphQLString },
        company_id: { type: graphql.GraphQLString },
        date_created: { type: graphql.GraphQLString },
        price: { type: graphql.GraphQLFloat } 
    }
});


// create a graphql query to select all and by id
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        //first query to select all
        Posts: {
            type: graphql.GraphQLList(CompanyType),
            resolve: (root, args, context, info) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const db = new dbService();
                        const result = await db.getCompanyInfo();
                        resolve(result);
                    } catch (err) {
                        reject([]);
                    }
                });
            }
        },
        //second query to select by id
        Prices:{
            type: graphql.GraphQLList(PriceType),
            args:{
                id:{
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }               
            },
            resolve: (root, {id}, context, info) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const db = new dbService();;
                        const result = await db.getPricesByCompanyId(id);
                        resolve(result);
                    } catch (err) {
                        reject([]);
                    }
                });
            }
        }
    }
});
//mutation type is a type of object to modify data (INSERT,DELETE,UPDATE)
var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      //mutation for creacte
      createPost: {
        //type of object to return after create in SQLite
        type: CompanyType,
        //argument of mutation creactePost to get from request
        args: {
          name: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
          },
          unique_symbol:{
              type: new graphql.GraphQLNonNull(graphql.GraphQLString)
          },
          exchange_symbol:{
              type: new graphql.GraphQLNonNull(graphql.GraphQLString)
          },
          price:{
              type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
          },
          total:{
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        }
        },
        resolve: (root, {name, unique_symbol, exchange_symbol, price, total}) => {
            return new Promise((resolve, reject) => {
                resolve({
                    id: '1'
                })
            })
        }
      },
      //mutation for update
      updatePost: {
        //type of object to return afater update in SQLite
        type: graphql.GraphQLString,
        //argument of mutation creactePost to get from request
        args:{
            id:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            },
            name: {
                type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            unique_symbol:{
                  type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            exchange_symbol:{
                  type: new graphql.GraphQLNonNull(graphql.GraphQLString)
            },
            price:{
                  type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
            },
            total:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
            }             
        },
        resolve: (root, {id, name, unique_symbol, exchange_symbol, price, total}) => {
            return new Promise((resolve, reject) => {
                resolve('123');
            })
        }
      },
      //mutation for update
      deletePost: {
         //type of object resturn after delete in SQLite
        type: graphql.GraphQLString,
        args:{
            id:{
                type: new graphql.GraphQLNonNull(graphql.GraphQLID)
            }               
        },
        resolve: (root, {id}) => {
            return new Promise((resolve, reject) => {
                resolve('delete');
            })
        }
      }
    }
});

//define schema with post object, queries, and mustation 
export const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType 
});
