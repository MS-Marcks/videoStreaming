
'use strict';

import db from "../../../config/db";

class ControllerSession {
    static async Session(req, res) {
        let body = req.body;
        const user = db.db[0].find(user => user.user === body.userSystem);
        if (!user) {
            const response = { message: "USUARIO NO EXISTE", code: 500 };
            res.json(response);
            return;
        }
        if (body.password !== user.pass) {
            const response = { message: "CLAVE INCORRECTA", code: 500 };
            res.json(response);
            return;
        }

        const token = user;
        const response = { message: { message: "ACCESO CORRECTO", token: req.GenerateToken({ token }) }, code: 200 };
        res.json(response);

    }
}
export default ControllerSession;