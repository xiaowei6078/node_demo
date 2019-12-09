const { SuccessMsg, ErrorMsg } = require("../module/messageModule");

const getUser = (req, res) => {
    const method = req.method;
    const route = req.route;
    

    if (method === "POST") {
        return new SuccessMsg(
            {
                meghod: "POST"
            },
            "成功"
        );
    }
}
module.exports = getUser;