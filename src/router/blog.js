const { SuccessMsg, ErrorMsg } = require("../module/messageModule");
const { getList, getDetail, newBlog } = require("../controller/blog")

const getBlog = (req, res) => {
    if (req.method === "GET") {
        if (req.route === "/api/blog/list") {
            const author = req.querystring.author || "";
            const keyword = req.querystring.keyword || "";
            const listData = getList(author, keyword);
            return new SuccessMsg(listData);
        }
        if (req.route === "/api/blog/detail") {
            const id = req.querystring.id;
            const detailData = getDetail(id);
            return new SuccessMsg(detailData);
        }
    }
    if (req.method === "POST") {
        if (req.route === "/api/blog/new") {
            const data = newBlog(req.body)
            return new SuccessMsg(data);
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
