const login = (userName, password) => {
    if (userName === '张三' && password === "123") {
        return true;
    }
    return false;
}
module.exports = {
    login
}