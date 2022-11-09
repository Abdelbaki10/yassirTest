import {Router} from 'express'
import WeatherService from '../services/weatherService';
import { GET_ZONE_AIR_QUALITY } from './config/routesNames';


const routes = Router();
routes.get(`${GET_ZONE_AIR_QUALITY}`,WeatherService.getZoneAirQuality)

export default routes; 