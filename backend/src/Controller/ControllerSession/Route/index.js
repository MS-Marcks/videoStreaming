import { Router } from 'express'
import Controller from '../Controller'
const router = Router();

router.post("/", Controller.Session)

export default router;
