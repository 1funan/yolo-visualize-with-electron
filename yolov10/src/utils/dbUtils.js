const sqlite3 = require("sqlite3").verbose()
const path = require('path')
const db = new sqlite3.Database(path.join(__dirname, '../', 'db', 'yolo.sqlite3'))
const GenId = require("./flake.js")
const genid = new GenId({ WorkerId: 1 });


db.async = {}
db.async.run = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("0")
            }
        });
    });
}

db.async.all = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}
module.export = { db, genid }