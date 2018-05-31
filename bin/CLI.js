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
	.arguments('<bo> <th>')
	.action(function (bo, th) {
		board = bo
        thread = th
        if (comm.html){
            fun.getHtml(board, thread)
            pl.log('html')
        }
        if(comm.json){

        }else{
            fun.getAllFilesFromThread(board, thread)
        }
	}).parse(process.argv);
