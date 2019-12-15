const { SuccessMsg, ErrorMsg } = require("../module/messageModule");
const { login } = require("../controller/user")

const getUser = (req, res) => {
    if (req.method === "POST") {
        if (req.route === "/api/user/login") {
            const { userName, password } = req.body;
            const result = login(userName, password);
            return result.then(data => {
                if (data.username) {
                    return new SuccessMsg("登录成功");
                } else {
                    return new ErrorMsg("登录失败");
                }
            });
        }
    }
    // 登录测试
    if (req.method === "GET") {
        if (req.route === "/api/user/login") {
            const { username, password } = req.querystring;
            const result = login(username, password);
            return result.then(data => {
                if (data.username) {
                    req.session['username'] = data.username;
                    req.session['realname'] = data.realname;
                    return new SuccessMsg("登录成功");
                } else {
                    return new ErrorMsg("登录失败");
                }
            });
        }
    }
    // 登录测试
    if (req.method === 'GET') {
        if (req.route === "/api/user/login-test") {
            if (req.session.username) {
                return Promise.resolve(new SuccessMsg(req.session));
            }
            return Promise.resolve(new SuccessMsg("尚未登录"));
        }
    }
}
module.exports = getUser;