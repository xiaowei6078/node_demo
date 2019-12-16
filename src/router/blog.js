const { SuccessMsg, ErrorMsg } = require("../module/messageModule");
const { getList, getDetail, newBlog , updateBlog, delBlog } = require("../controller/blog");
//检查登录
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorMsg("尚未登录"))
    }
}

const getBlog = (req, res) => {
    const id = req.querystring.id;
    if (req.method === "GET") {
        if (req.route === "/api/blog/list") {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            const author = req.querystring.author || "";
            const keyword = req.querystring.keyword || "";
            const result = getList(author, keyword);
            return result.then(listData => {
                return new SuccessMsg(listData);
            })
        }
        if (req.route === "/api/blog/detail") {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            // const id = req.querystring.id;
            // const detailData = getDetail(id);
            const result = getDetail(id);
            return result.then(data => {
                return new SuccessMsg(data);
            });
        }
    }
    if (req.method === "POST") {
        if (req.route === "/api/blog/new") {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            req.body['author'] = req.session.username;
            const result = newBlog(req.body);
            return result.then(data => {
                return new SuccessMsg(data);
            });
        }
        if (req.route === "/api/blog/update") {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            const result = updateBlog(id, req.body);
            return result.then(res => {
                if (res) {
                    return new SuccessMsg("更新成功");
                } else {
                    return new ErrorMsg("更新失败");
                }
            })
        }
        if (req.route === "/api/blog/del") {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            const author = req.session.username;
            const result = delBlog(id, author);
            return result.then(res => {
                if (res) {
                    return new SuccessMsg("删除成功");
                } else {
                    return new ErrorMsg("删除失败");
                }
            });
        }
    }
};

module.exports = getBlog;
