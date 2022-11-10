import {Router} from 'express';
import { WEATHER } from './static/routesNames';
import weatherController from '../components/weather/weather.controller';

const routes = Router();
routes.use(`${WEATHER}`,weatherController);

export default routes; 