const querystring = require("querystring");
const blog = require("./bin/module/blog");
const { ErrorMsg } = require("./bin/module/messageModule");

const serverHeader = (req, res) => {
    res.setHeader("Content-type", "application/json");

    const urlArr = req.url.split("?");
    req.route = urlArr[0];
    req.querystring = urlArr[1] ? querystring.parse(urlArr[1]) : "";

    const blogData = blog(req);
    if (blogData) {
        res.end(JSON.stringify(blogData));
        return;
    }
    res.end(
        JSON.stringify(
            new ErrorMsg({
                msg: "404 not found"
            })
        )
    );
};

module.exports = serverHeader;
