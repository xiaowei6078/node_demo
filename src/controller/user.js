const { exec } = require("../db/mysql")

const login = (userName, password) => {
    const sql = `select * from users where username='${userName}' and password=${password}`;
    return exec(sql).then(data => {
        return data[0] || {};
    })
}
module.exports = {
    login
}