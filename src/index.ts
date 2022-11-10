import "reflect-metadata";
import express from 'express';
import {getOrmconfigConnection} from './serverConfig/configConnection';
import routes from './routes';
import cron from 'node-cron';
import WeatherService from "./components/weather/weather.service";
import { middlewares } from "./serverConfig/middleware";


const app = express();

getOrmconfigConnection(process.env.NODE_ENV).then(({appDataSource,SERVERPORT})=>{
 
  appDataSource.initialize().then(()=>{
    // initilizing middlewares 
    middlewares(app,appDataSource)

    // intilizing app routes 
    app.use('/api', routes);

    // starting app server
    app.listen(SERVERPORT, () => {
      console.log(`Example app listening on port ${SERVERPORT}`)
    })

    //saving air quality information for PARIS every 1 minute
    cron.schedule('* * * * *', ()=>{
      WeatherService.getAndSaveParisAirQuality;
      console.log('cron job result');
    });
  })
})


