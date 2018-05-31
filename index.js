const pl = require('pinklog')
const fs = require('fs');
const got = require('got');

const baseApi = 'https://a.4cdn.org/'
const htop = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>4chan</title></head><body>'
const hbot = '</body></html>'

const getThread = (board, thread, callback) => {
    got(baseApi + board + '/thread/' + thread + '.json')
        .then(response => {
            pl.ok('succ')
            callback(response.body, board)
        })
        .catch(error => {
            pl.err('err1')
            if (error) {
                pl.err(error)
            }
            //callback(error.response.body)
        })
}
const downFile = (name, board, tim, ext) => {
    let fl = fs.createWriteStream(name + ext);
    got.stream(baseApi + board + '/' + tim + ext).pipe(fl)
    //pl.log(name+ext+' - '+board+'/'+tim+ext)
}
const getJson = (board, thread) => {
    getThread(board, thread, (data, board) => {

        let d = JSON.parse(data)
        //pl.ob(d.posts[0].no)
        let fl = fs.createWriteStream(thread + '.json');
        fl.write(d.posts)
        fl.end
    })
}
const getAllFilesFromThread = (board, thread) => {
    getThread(board, thread, (data, board) => {

        let d = JSON.parse(data)
        //pl.ob(d.posts[0].no)
        for (i in d.posts) {
            let p = d.posts[i]
            if (p.filename) {
                downFile(p.filename, board, p.tim, p.ext)
                //pl.log(p.filename+p.ext)
            }
            //pl.ob(d.posts[i])
        }
    })
}
const getHtml = (board, thread) => {
    getThread(board, thread, (data, board) => {
        let html = ''
        html += htop
        let d = JSON.parse(data)
        //pl.ob(d.posts[0].no)
        for (i in d.posts) {
            let p = d.posts[i]
            html += '<div><h3>'+p.no+'</h3>'


            if (p.filename) {
                downFile(p.filename, board, p.tim, p.ext)
                //pl.log(p.filename+p.ext)

                if(p.ext == '.jpg' || p.ext == '.png' || p.ext == '.gif'){
                    html += '<img src="'+p.filename + p.ext+'"></img>'
                }
                if(p.ext == '.webm'){
                    html += '<video src="'+p.filename + p.ext+'"></video>'
                }
            }
            if (p.com) {
                html += '<p>'+p.com+'</p>'
            }

            html +='</div>'
            //pl.ob(d.posts[i])
        }
        html += hbot
        let fl = fs.createWriteStream(thread + '.html');
        fl.write(html)
        fl.end
    })
}

module.exports = {
    getAllFilesFromThread: getAllFilesFromThread,
    getHtml: getHtml,
    getJson: getJson

}


const getBoard = function(board){
    this.board = board
}

getBoard.prototype.getThread = function(thread){
    this.tread = thread
}
