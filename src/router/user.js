const { SuccessMsg, ErrorMsg } = require("../module/messageModule");
const { login } = require("../controller/user")

const getUser = (req, res) => {
    if (req.method === "POST") {
        if (req.route === "/api/user/login") {
            console.log("123")
            const { userName, password } = req.body;
            const loginData = login(userName, password);
            if (loginData) {
                return new SuccessMsg("登录成功");
            } else {
                return new ErrorMsg("登录失败");
            }
        }
    }
}
module.exports = getUser;