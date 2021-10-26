'use strict';
import { Router } from 'express'
import ControllerEmision from '../Controller/ControllerEmision/Route'


var route = Router();

route.use('/emission', ControllerEmision)



export default route;
