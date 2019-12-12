const getList = (author, keyword) => {
    return [
        {
            id:1,
            title: "标题A",
            content: "内容A",
            createTime: 15466610021,
            author: "zhangsan"
        },
        {
            id:1,
            title: "标题B",
            content: "内容B",
            createTime: 15466610021,
            author: "lisi"
        }
    ]
}

const getDetail = (id) => {
    return {
        id:1,
        title: "标题B",
        content: "内容B",
        createTime: 15466610021,
        author: "lisi"
    }
}

const newBlog = (blogData = {}) => {
    return {
        id: 3
    }
}

const updateBlog = (id = "", blogData ={}) => {
    return true
}

const delBlog = (id = "") =>{
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}