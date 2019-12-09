class Message {
    constructor(data, msg) {
        if (typeof data === "string") {
            this.message = data;
            this.data = null;
        } else {
            this.data = data;
            this.message = msg;
        }
    }
}

class SuccessMsg extends Message {
    constructor(data, msg) {
        super(data, msg);
        this.code = 0;
    }
}

class ErrorMsg extends Message {
    constructor(data, msg) {
        super(data, msg);
        this.code = -1;
    }
}

module.exports = {
    SuccessMsg,
    ErrorMsg
};
