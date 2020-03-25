const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DB {
    constructor({ NAME }) {
        this.db = new sqlite3.Database(path.join(__dirname, NAME));
    }

    destructor() {
        if (this.db) this.db.close();
    }

    getUser(login) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = "SELECT * FROM user WHERE login=?";
            this.db.get(query, [login], (err, row) => resolve(err ? null : row));
        }));
    }

    getUserByLoginPass(login, password) {
        return new Promise(resolve => this.db.serialize(() => {
            const query = "SELECT * FROM user WHERE login=? AND password=?";
            this.db.get(query, [login, password], (err, row) => resolve(err ? null : row));
        }));
    }
}

module.exports = DB;