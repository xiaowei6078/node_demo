const querystring = require("querystring");
const blog = require("./src/router/blog");
const user = require("./src/router/user");

const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) =>{
        if (req.method !== 'POST') {
            resolve({})
            return;
        }
        if (req.headers["content-type"] !== "application/json") {
            resolve({})
            return;
        }
        let postData = "";
        req.on("data", chunk => {
            postData += chunk.toString();
        });
        req.on("end", () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        })
    });
    return promise;
}

let SESSION_DATA = {};

const serverHeader = (req, res) => {
    res.setHeader("Content-type", "application/json");

    const urlArr = req.url.split("?");
    //路由地址
    req.route = urlArr[0];
    //get请求数据
    req.querystring = querystring.parse(urlArr[1] || "{}");

    req.cookie = {};

    req.session = {};

    const cookieStr = req.headers.cookie || "";
    cookieStr.split(";").forEach(item => {
        if (!item) {
            return;
        }
        const arr = item.split("=");
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    });

    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};

    }
    req.session = SESSION_DATA[userId];

    getPostData(req).then(postData => {
        req.body = postData;
        
        // const blogData = blog(req, res);
        // if (blogResult) {                
        //     res.end(JSON.stringify(blogData));
        //     return;
        // }
        const blogResult = blog(req, res);
        if (blogResult) {
            if (needSetCookie) {
                res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
            }
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData));
            })
            return;
        }

        const userData = user(req, res);
        if (userData) {
            if (needSetCookie) {
                res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
            }
            userData.then(data => {
                res.end(JSON.stringify(data));
            })
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
    })

};

module.exports = serverHeader;
