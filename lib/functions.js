const forget = require('./4chan.js')
const pl = require('pinklog')
const eEmitter = require('events').EventEmitter;
const fs = require('fs');
const cli = require('cli')
let fun = {}

const fileOpts = {
  flags: 'wx',
};

const htop = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>4chan</title></head><body>'
const hbot = '</body></html>'

fun.getAllFilesFromThread = (board, thread) => {
    let bord = forget.Board(board)

    bord.thread(thread)
        .then(resp => {
            let d = JSON.parse(resp.body)
            let l = d.posts.length-1
            let c = 0;
            cli.info('Download: ' + l+ ' from ' + board)
            cli.progress(0)
            for (i in d.posts) {
                let p = d.posts[i]
                if (p.filename) {
                    let exists = false
                    let fl = fs.createWriteStream(p.filename + p.ext, fileOpts)
                    fl.on('error', function(err) {
                        //pl.err(err)
                        exists = true
                        fl.end()
                    });
                    if(!exists){
                        bord.imageStream(p.tim + p.ext).pipe(fl).on('close', function (){
                            //pl.log('done: ' + p.filename + p.ext)
                            //pl.log('num: ' + c)
                            //cli.info('Download: ' + c + ' of ' + l+ ' from ' + board)
                            cli.progress(c/l)
                            c++
                        }).on('error', err => {
                            cli.progress(c/l--)
                            //pl.err(err)
                        })
                    }
                }
                else{c++}
            }
        }).catch(error => {
            if (error) {
                pl.err(error)
            }
        })
}

fun.getHtml = (board, thread) => {

    let bord = forget.Board(board)

    bord.thread(thread)
    .then(resp => {
        let html = ''
        html += htop
        let d = JSON.parse(resp.body)
        //pl.ob(d.posts[0].no)
        for (i in d.posts) {
            let p = d.posts[i]
            html += '<div class=""><h3>'+p.no+'</h3>'

            if (p.filename) {

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

    }).catch(error => {
            if (error) {
                pl.err(error)
            }
        })
}

fun.getJson = (board, thread) => {
    let bord = forget.Board(board)
    bord.thread(thread)
        .then(resp => {
            console.log(resp.body)
        })
        .catch(error => {
                if (error) {
                    pl.err(error)
                }
            })

    getThread(board, thread, (data, board) => {

        let d = JSON.parse(data)
        //pl.ob(d.posts[0].no)
        let fl = fs.createWriteStream(thread + '.json');
        fl.write(d.posts)
        fl.end
    })
}

module.exports = fun
