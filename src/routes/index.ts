import {Router} from 'express';
import { WEATHER } from './config/routesNames';
import weatherRoute from './weatherRoute';

const routes = Router();
routes.use(`${WEATHER}`,weatherRoute);

export default routes; 