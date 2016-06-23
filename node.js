var http = require("http");//引入require模块

http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text-plain'});

	response.end('hello liuyuan');

}).listen(8889);

console.log("serve running at http://127.0.0.1:8888");
