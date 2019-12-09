const { SuccessMsg, ErrorMsg } = require("./messageModule");

const getBlog = (req, res) => {
    const method = req.method;

    if (method === "GET") {
        if (req.route === "/api/blog/list") {
            return new SuccessMsg(
                {
                    meghod: "GET"
                },
                "列表"
            );
        }
        if (req.route === "/api/blog/detail") {
            return new SuccessMsg(
                {
                    meghod: "GET"
                },
                "详情"
            );
        }
        if (req.route === "/api/blog/new") {
            return new SuccessMsg(
                {
                    meghod: "GET"
                },
                "创建"
            );
        }
        if (req.route === "/api/blog/update") {
            return new SuccessMsg(
                {
                    meghod: "GET"
                },
                "更新"
            );
        }
    }
};

module.exports = getBlog;
