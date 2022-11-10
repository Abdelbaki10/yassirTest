import {Router} from 'express'
import WeatherService from './weather.service';
import { GET_PARIS_MAX_AIR_QUALITY_POLLUTION, GET_SAVE_PARIS_AIR_QUALITY, GET_ZONE_AIR_QUALITY } from '../../routes/static/routesNames';


const routes = Router();
// get airquality based on latitude $ longitude
routes.get(`${GET_ZONE_AIR_QUALITY}`,WeatherService.getZoneAirQuality)
// route for cron job 
routes.get(`${GET_SAVE_PARIS_AIR_QUALITY}`,WeatherService.getAndSaveParisAirQuality)
// gets the datetime where paris is mostly polluted  
routes.get(`${GET_PARIS_MAX_AIR_QUALITY_POLLUTION}`,WeatherService.getMostPollutedParisAirQDates)

export default routes; 