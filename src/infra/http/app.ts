
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v1Router } from './api/v1';
import { isProduction, clsName } from '../../config';
import {createNamespace} from "cls-hooked";
import "express-async-errors";

const app = express();

const origin = {
  origin: isProduction ? 'https://whitelabel.com' : '*',
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(origin))
app.use(compression())
app.use(helmet())
app.use(morgan('combined'))

// create per request scope context

app.use((req, res, next) => {
  const ns = createNamespace(clsName);
  ns.bindEmitter(req);
  ns.bindEmitter(res);
  ns.run(() => {
    next();
  });
});

app.use('/api/v1', v1Router)

// New api versions can go here

app.listen(process.env.PORT || 9044, () => {
  console.log(`[App]: Server listening on 9044`)
})

export { app };