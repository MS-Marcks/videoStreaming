import { Router } from 'express'
import Controller from '../Controller'
import path from 'path';
import multer from 'multer';


var storagePoster = multer.diskStorage({
    destination: function (req, file, cb) {
        req.idVideo = Date.now();
        cb(null, path.join(path.resolve('.'), 'media', 'preload'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        file.originalname = name;
        cb(null, name)
    }
})

var uploadPoster = multer({ storage: storagePoster })

var storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.resolve('.'), 'media', 'video'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        file.originalname = name;
        cb(null, name)
    }
})

var uploadVideo = multer({ storage: storageVideo })

const router = Router();

router.get("/", Controller.SearchAllVideo)
router.get("/:id", Controller.SearchUniqueVideo)
router.get("/:id/data", Controller.SearchDataVideo)
router.post("/upload/poster", uploadPoster.single('poster'), Controller.UploadPoster)
router.post("/upload/video", uploadVideo.single('video'), Controller.UploadVideo)



export default router;