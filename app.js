const querystring = require("querystring");
const blog = require("./bin/module/blog");
const user = require("./bin/module/user");
const { ErrorMsg } = require("./bin/module/messageModule");

const serverHeader = (req, res) => {
    res.setHeader("Content-type", "application/json");

    const urlArr = req.url.split("?");
    //路由地址
    req.route = urlArr[0];
    //get请求数据
    req.querystring = querystring.parse(urlArr[1] || "{}");

    const blogData = blog(req, res);
    if (blogData) {
        res.end(JSON.stringify(blogData));
        return;
    }

    const userData = user(req, res);
    if (blogData) {
        res.end(JSON.stringify(userData));
        return;
    }

    // res.end(
    //     JSON.stringify(
    //         new ErrorMsg({
    //             msg: "404 not found"
    //         })
    //     )
    // );
    //路由地址不存在 报404  以文本的形式返回给客户端
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
};

module.exports = serverHeader;
