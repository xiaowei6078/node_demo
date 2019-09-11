const { SuccessMsg, ErrorMsg } = require("./messageModule");

const getBlog = (req, res) => {
    const method = req.method;
    const route = req.route;
    console.log(route);

    if (method === "GET") {
        return new SuccessMsg(
            {
                meghod: "GET"
            },
            "成功"
        );
    }

    if (method === "POST") {
        return new SuccessMsg(
            {
                meghod: "POST"
            },
            "成功"
        );
    }
};

module.exports = getBlog;
