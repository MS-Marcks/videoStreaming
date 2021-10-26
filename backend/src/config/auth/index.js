'use strict';
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}
const AUTHOptionsLive = {
    UrlStart: "/session",
    //2 horas
    ActiveTime: '2h',
    KEY_TOKEN: process.env.KEY_TOKEN,
    NameToken: "access-token-live",
    EncryptionMethod: "HS256"
}

const corsOptionsLive = { origin: '*' }

module.exports = {
    AUTHOptionsLive, corsOptionsLive
}