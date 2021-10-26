import express from 'express'
import helmet from "helmet"
import bodyParser from 'body-parser'
import route from './config/route'
import routeLive from './config/route.live'
import cors from 'cors'
import morgan from 'morgan'
import auth from 'authmiddlewarenodejs';
import path from "path";

import { AUTHOptionsLive, corsOptionsLive } from './config/auth'

const app = express()
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('common'))
}

app.use(function (req, res, next) {
    res.set('Cache-control', 'no-cache, no-store, must-revalidate;');
    next();
})

app.use(bodyParser.urlencoded({ extended: false, limit: '1000mb' }))
app.use(bodyParser.json({ limit: '1000mb' }))
app.use(helmet());

/*  ================================
                LIVE
    ================================*/
app.use('/live', cors(corsOptionsLive), auth(AUTHOptionsLive), route);

app.use('/video', cors(corsOptionsLive), routeLive);

app.use('/preload', express.static(path.join(path.resolve(".", "media", "preload"))));
app.get('/', (req, res) => {
    res.send('Welcome orchestrator')
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`http://localhost:${server.address().port}`)
})

export default app






