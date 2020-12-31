import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { apiRouter } from './api';
import { graphqlHTTP }  from 'express-graphql';
import { schema } from './graphql/company';
import { Logger } from './services';
import { EventEmitter } from "events";
import { SQLite3 } from './db';

// Create a new express app instance
const app: express.Application = express();
const port = Number(process.env.PORT) || 3001;
const logger = Logger.getInstance();
const eventEmitter = new EventEmitter();

app.set('eventEmitter', eventEmitter);

app.use(cors());
// Not needed if compression is in reverse server already
app.use(compression());
app.use("/api", apiRouter);
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true}));

process.on('uncaughtException', (er) => {
    console.error(er.stack)
    process.exit(1);
  })

  process.on('SIGINT', async () => {
    await SQLite3.closeDB();
    process.exit();
  });

app.listen( port, 'localhost', async() => {
    eventEmitter.emit('server_connection', 'Start');
    const msg = `App is listening on port ${port}!`;
    logger.log(`App is listening on port ${port}!`);
    return console.log(msg);
});