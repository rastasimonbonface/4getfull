#!/usr/bin/env node
const pl = require('pinklog')
const comm = require('commander')
const fun = require('../lib/functions.js')

let board = ''
let thread = ''

comm
	.version('1.0.0')
    .option('-h, --html', 'generate html')
    .option('-j, --json', 'generate json only')
    .option('-i, --image', 'download images only')
    .option('-w, --webm', 'download webms only')
	.arguments('<bo> <th>')
	.action(function (bo, th) {
		board = bo
        thread = th
        if (comm.html){
            fun.getHtml(board, thread)
            pl.log('html')
        }
        else if(comm.json){

        }
        else if(comm.image || comm.webm){
            fun.getAllFilesFromThreadWithOptions(board, thread, {
                    i:comm.image || false,
                    w:comm.webm || false
                })
        }
        else{
            fun.getAllFilesFromThread(board, thread)
        }
	}).parse(process.argv);
