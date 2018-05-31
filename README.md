# 4getfull


This is a 4chan api + image downloader.



Installation
------------

### CLI

```shell
(sudo) npm install 4getfull -g
```


### In your application

```shell
npm install 4getfull --save
```


Usage
-----

### CLI

```shell
4getfull [boardname] [threadnumber]
```

### In your application

```js
const forget = require('4getfull')
const randomBoard = forget.Board('b')

randomBoard.thread('9001').then([your callback function]).catch([your error handler])
```
