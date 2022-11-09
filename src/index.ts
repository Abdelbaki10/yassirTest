import "reflect-metadata";
import express from 'express';
import {SERVERPORT} from './serverConfig/config';
import routes from './routes';
import { createDbConnection } from "./utils/helper";

const app = express();
app.use('/api', routes);

createDbConnection().then(()=>{
    app.listen(SERVERPORT, () => {
      console.log(`Example app listening on port ${SERVERPORT}`)
    })
  }
);
