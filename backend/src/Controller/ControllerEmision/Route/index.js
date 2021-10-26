import { Router } from 'express'
import Controller from '../Controller'

const router = Router();

router.get("/:id/data", Controller.SearchDataVideo)




export default router;