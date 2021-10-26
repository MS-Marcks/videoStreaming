
'use strict';
import path from "path";
import fs from "fs";
import db from "../../../config/db";
class ControllerVideo {
    static async SearchDataVideo(req, res) {
        let id = parseInt(req.params.id);
        const videoInfo = db.db[1].find(video => video.id === id);
        if (!videoInfo) {
            res.json({ message: "none" });
            return;
        }
        const videoPath = path.join(path.resolve(".", "media", videoInfo.src));
        const videoStat = fs.statSync(videoPath);
        const videoSize = videoStat.size;
        const videoRange = req.headers.range;
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = (start + 102400) > videoSize ? (videoSize - 1) : (start + 102400);
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': videoSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    }
    static async SearchUniqueVideo(req, res) {
        let id = parseInt(req.params.id);
        console.log(id)
        const video = db.db[1].find(video => video.id === id);
        if (video) {
            res.json(video);
        } else {
            res.json({ message: "none" });
        }
    }
    static async SearchAllVideo(req, res) {
        res.json(db.db[1])
    }
    static async UploadPoster(req, res) {        
        db.db[1].push({
            _length: (db.db[1].length),
            id: req.idVideo,
            src: "",
            preload: "preload/" + req.file.originalname,
            title: ""
        })
        res.json(req.idVideo);
    }
    static async UploadVideo(req, res) {
        let videoInfo = db.db[1].find(video => video.id === parseInt(req.body.idVideo));
        videoInfo.src = "video/"+ req.file.originalname
        videoInfo.title =req.body.title
        db.db[1][videoInfo._length] = videoInfo;
        res.json("OK");
    }
}
export default ControllerVideo;