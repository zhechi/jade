var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie')//引入模式文件拿到导出的模块
var Movie = mongoose.model('Movie',MovieSchema)//传入模型模式的名字

module.exports = Movie //输出