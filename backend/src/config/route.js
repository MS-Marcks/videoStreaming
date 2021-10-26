'use strict';
import { Router } from 'express'
import ControllerVideo from '../Controller/ControllerVideo/Route'
import ControllerSession from '../Controller/ControllerSession/Route'


var route = Router();

route.use('/video', ControllerVideo)
route.use('/session', ControllerSession)


export default route;
