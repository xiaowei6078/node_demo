const { SuccessMsg, ErrorMsg } = require("../module/messageModule");
const { getList, getDetail, newBlog , updateBlog, delBlog } = require("../controller/blog")

const getBlog = (req, res) => {
    const id = req.querystring.id;
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
            const updateData = updateBlog(id, req.body);
            if (updateData) {
                return new SuccessMsg("更新成功");
            } else {
                return new ErrorMsg("更新失败");
            }
        }
        if (req.route === "/api/blog/del") {
            const delData = delBlog(id);
            if (delData) {
                return new SuccessMsg("删除成功");
            } else {
                return new ErrorMsg("删除失败");
            }
        }
    }
};

module.exports = getBlog;
