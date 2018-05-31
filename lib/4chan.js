const got = require('got');

const baseUrl = "https://a.4cdn.org"
const baseImg = "https://i.4cdn.org"

let api = {}

const boardPrototype = {
    init: function (bo) {
        this.board = bo
    },
    imageStream: function (file) {
        let uri = [baseImg, this.board, "src", file].join("/")
        return got.stream(uri)
    },
    image: function (file) {
        let uri = [baseImg, this.board, "src", file].join("/")
        return got(uri)
    },
    catalog: function () {
        let uri = [baseUrl, this.board, "catalog.json"].join("/");
        return got(uri)
    },
    threads: function () {
        var uri = [baseUrl, this.board, "threads.json"].join("/");
        return got(uri)
    },
    page: function (num) {
        var uri = [baseUrl, this.board, num + ".json"].join("/");
        return got(uri)
    },
    thread: function (num) {
        let uri = [baseUrl, this.board, "res", num + ".json"].join("/");
        return got(uri)
    }
};

const boardsPrototype = {
    init: function () {
        return this;
    },
    get: function (cb) {
        let uri = [baseUrl, "boards.json"].join("/");
        return got(uri)
    }
}

api.Board = (bo) => {
    function F() {}
    F.prototype = boardPrototype
    var f = new F()
    f.init(bo)
    return f
}

api.Boards = () => {
    function F() {}
    F.prototype = boardPrototype
    var f = new F()
    f.init()
    return f
}

module.exports = api
