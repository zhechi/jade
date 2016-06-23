var pArr = process.argv;
var result = 0;
for(var i = 2,len = pArr.length;i < len;i++){
  result += Number(pArr[i]);
}
  //读取同步文件中内容的行数
// var fs = require('fs');

// var buf = fs.readFileSync(process.argv[2]);
// var str = buf.toString();
// str = str.split("\n");
// console.log(str.length-1)

  //读取异步文件中内容的行数 异步需要等待
// var fs = require('fs');
// var buf = undefined;

// fs.readFile(process.argv[2],'utf-8',function (err, data) {
//   if (err) throw err;
//   buf = data.split("\n");
//   console.log(buf.length-1)
// });

  //LS 过滤器,要过滤出来的文件的扩展名
// var fs = require('fs')
// var path = require('path')
 
// var folder = process.argv[2]
// var ext = '.' + process.argv[3]

// fs.readdir(folder, function (err, files) {
//  if (err) return console.error(err)
//  files.forEach(function(file) {
//      if (path.extname(file) === ext) {
//          console.log(file)//process.stdout.write
//      }
//  })
// })
/*介绍模块概念
  创建两个文件夹
  编写程序打印所给文件目录的所含文件的列表
  以特定的文件后缀名来过滤这个列表
  编写模块，export一个函数，接受三个参数（目录名，文件扩展名，回调函数（err,  
  data））
*/
// var mymodule = require('../mymodule.js')

// var folder = process.argv[2]
// var ext =process.argv[3]
// console.log(process.argv)
// mymodule(folder,ext,function(err,list){
//   if(err) {
//     return err;
//   }

//   list.forEach(function (file) {  
//     console.log(file)  
//   }) 
// })
//
//var http = require("http");
// var bl = require("bl");
// http.get(process.argv[2],function(res){
//   res.pipe(bl(function(err,data){
//     if(err)
//       return console.error(err)
//     console.log(data.toString().length)
//     console.log(data.toString())

//   }))
// }).on('error',function(data){
//   console.log(data)
// })


/*
你需要收集每一个 URL 所返回的完整内容，然后将它们在终端（标准输出  
  stdout）打印出来。这次你不需要打印出这些内容的长度，仅仅是内容本身即可（字  
  符串形式）；每个 URL 对应的内容为一行。重点是你必须按照这些 URL  
  在参数列表中的顺序将相应的内容排列打印出来才算完成。  

const url1 = process.argv[2]; 
const url2 = process.argv[3]; 
const url3 = process.argv[4]; 

// console.log(url1);
// console.log(url2);
// console.log(url3);

http.get(url1,res =>{
  res.setEncoding('utf-8');
  var data = '';
  res.on('data',chunk =>{
   data += chunk; 
  })
  res.on('end',() =>{
    console.log(data);

    http.get(url2,res =>{
      res.setEncoding('utf-8');
      var data = '';
      res.on('data',chunk =>{
        data += chunk;
      })
      res.on('end',() =>{
        console.log(data);

        http.get(url3,res =>{
          res.setEncoding('utf-8');
          var data ='';
          res.on('data',chunk =>{
              data += chunk;
          })
          res.on('end',() =>{
            console.log(data);
          })
        })
      })
    })
  })
})
*/
/*
var bl = require('bl')
var results = []
var count = 0

function printResults(){
  for(var i = 0;i < 3;i++)
    console.log(results[i])
}

function httpGet(index){
  http.get(process.argv[2+index],function(response){
    response.pipe(bl(function(err,data){
      if(err)
        return console.error(err)
      
      results[index] = data.toString()
      count++

      if(count == 3)
        printResults()
    }))
  })
}

for(var i = 0;i < 3;i++)
  httpGet(i)
*/

/*
var net = require('net')
var server = net.createServer(function(socket){
  var date = new Date();
  var y = date.getFullYear()
  var m = date.getMonth()+1>9?date.getMonth()+1:'0' + (date.getMonth()+1)
  var d = date.getDate()>9?date.getDate():'0' + date.getDate()
  var h = date.getHours()>9?date.getHours():'0' + date.getHours()
  var min = date.getMinutes()>9?date.getMinutes():'0' + date.getMinutes()
  date = y +"-"+ m +"-"+ d +" "+ h +":"+ min + "\n"
  // console.log(process.argv[2]);
  socket.write(date)
  socket.end()
})
server.listen(process.argv[2])
*/

/*
  var net = require('net')  
       
     function zeroFill(i) {  
       return (i < 10 ? '0' : '') + i  
     }  
       
     function now () {  
       var d = new Date()  
       return d.getFullYear() + '-'  
         + zeroFill(d.getMonth() + 1) + '-'  
         + zeroFill(d.getDate()) + ' '  
         + zeroFill(d.getHours()) + ':'  
         + zeroFill(d.getMinutes())  
     }  
       
     var server = net.createServer(function (socket) {  
       socket.end(now() + '\n')  
     })  
       
     server.listen(Number(process.argv[2]))  

 */
/*
var net = require('net')

function zeroFill(i){
  return (i < 10 ? '0' : '') +i
}

function now(){
  var d = new Date()
  return d.getFullYear() + '-'
    + zeroFill(d.getMonth() + 1) + '-'
    + zeroFill(d.getDate()) +' '
    + zeroFill(d.getHours()) +':'
    + zeroFill(d.getMinutes())
}

var server = net.createServer(function(socket){
  socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))
*/

/*
var http = require("http")
var fs = require("fs")
var server = http.createServer(function(req,res){
  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]))
*/

/*var http = require("http")
var map =  require("through2-map")

var server = http.createServer(function(req,res){
  if(req.method != "POST"){
    return res.end('send me a post \n')
  }
  req.pipe(map(function(chunk){
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]))


*/
// const http = require('http');
// const fs = require('fs');
// const port = process.argv[2];

// const server = http.createServer((req, res) => {

//   if (req.method == 'POST') {
//     req.on('data', chunk => {
//       console.log(chunk.toString());
//       res.write(chunk.toString().toUpperCase())
//     })
//     req.on('end', () => {
//       res.end();
//     })
//   }
// })

// server.listen(port);

var http = require("http")
var fs = require("fs")
var url = require("url")
var port = process.argv[2]

var server = http.createServer(function(req,res){
  console.log(res)
  var URL = url.parse(req.url,true);
  if(URL.pathname === '/api/parsetime'){
    var iso = URL.query['iso'];
    var date = new Date(iso);
    console.log(date)
    
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    console.log(hour)

    var json = {
      hour:hour,
      minute:minute,
      second:second
    };
    var data = JSON.stringify(json)

    res.writeHead(200,{
      'Content-Type':'application/json'
    })
    res.write(data);
    res.end();
  }

  if(URL.pathname === '/api/unixtime'){
    var iso = URL.query['iso'];
    var unixtime = new Date(iso).getTime();

    var json = {
      unixtime: unixtime
    }
    console.log(json)
    var data = JSON.stringify(json)//json字符串

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })

    res.write(data);//向请求的客户端发送响应内容。
    res.end();
  }
})

server.listen(port);