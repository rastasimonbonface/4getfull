const faget = require('./lib/4chan.js')
const fs = require('fs');
const pl = require('pinklog')
let file = '1509233328456.webm'

const work = faget.Board('wsg')


let fl = fs.createWriteStream(file);
work.image(file).pipe(fl)


//work.thread('2946046')
//            .then(response => {
//                pl.ok('succ')
//                //callback(response.body, board)
//                pl.ob(response)
//            }).catch(error => {
//                pl.err('my err')
//                if (error) {
//                    pl.err(error)
//                }
//                //callback(error.response.body)
//            })
