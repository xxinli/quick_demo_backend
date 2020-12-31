// const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
import express from 'express';
import { resolvers, typeDefs } from './graphql';
import { SQLite3 } from './db';
import { RedisCache } from 'apollo-server-cache-redis';

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async () => ({
    db: await SQLite3.initDB()
  }),
  // cache: new RedisCache({
  //   host: 'redis-server',
  //   // Options are passed through to the Redis client
  // }),
  persistedQueries: {
    // cache: new RedisCache({
    //   host: 'redis-server',
    //   // Options are passed through to the Redis client
    // }),
    ttl: 900, // 15 minutes
  },
  cacheControl: {
    defaultMaxAge: 5,
  },
  formatError: (err: any) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith("Database Error: ")) {
      return new Error('Internal server error');
    }

    if (err.originalError instanceof AuthenticationError) {
      return new Error('Different authentication error message!');
    }
    
    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
  },
  tracing: process.env.NODE_ENV === 'development' ? true : false
 });
const app = express();
server.applyMiddleware({ app });

process.on('SIGINT', () => {
  SQLite3.closeDB();
  process.exit();
});

app.listen(4000, 'localhost', () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);