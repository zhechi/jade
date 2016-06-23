var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
  doctor: String,
  title: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  flash: String,
  year: Number,
  meta:{
    creareAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
})

MovieSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.creareAt = this.meta.updateAt = Date.now()
  }else{
    this.meta.updateAt = Date.now()
  }

  next()//将存储流程走下去
})
//经过模型编译实例化才能使用
MovieSchema.statics = {
  fetch:function(cb){//取出数据库里面所有的数据
    return this
      .find({})
      .sort('meta.updateAt')//按着更新时间排序
      .exec(cb) //执行回调方法
  }, 
  findById:function(id,cb){//取出数据库里面单条数据
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}
module.exports = MovieSchema //将模式导出