var express = require('express')
var bodyParser = require('body-parser')//4以后需要单独引用
var path = require('path')
var mongoose = require('mongoose')//定义mongoose模块，链接数据库
var _ = require('underscore')
var Movie = require('./models/movie')//模式 
var port = process.env.PORT || 3000
var app = express()

// mongoose.connect('mongodb://localhost/imooc')
app.set('views','./views/pages')
//设置一下渲染引擎  res.render(file,option)是express中专门渲染视图用
app.set('view engine','jade')
app.use(bodyParser.json())//表单数据格式化
app.use(express.static(path.join(__dirname,'bower_components')))//拼接路径
app.listen(port)

console.log('imooc started on port')

//加上路由 index page
app.get('/',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('index',{
    title:'极客公园 首页',
    movies:movies
    // movie:[{
    //   title:'机械战警',
    //   _id:1,
    //   poster:'http://'
    // },{
    //   title:'机械战警',
    //   _id:2,
    //   poster:'http://'
    // },{
    //   title:'机械战警',
    //   _id:3,
    //   poster:'http://'
    // },{
    //   title:'机械战警',
    //   _id:4,
    //   poster:'http://'
    // },{
    //   title:'机械战警',
    //   _id:5,
    //   poster:'http://'
    // },{
    //   title:'机械战警',
    //   _id:6,
    //   poster:'http://'
    // }]  
    })
  })
})

//加上路由 detail page
app.get('/movie/:id',function(req,res){
  res.render('detail',{
    title:'极客公园 详情页',
    movie:{
      doctor:'何塞.帕蒂利亚',
      country:'美国',
      title:'机械战警',
      year:2014,
      poster:'http://',
      language:'英语',
      flash:'http://',
      summary:'sdksddds'
    }
  })
})

//加上路由 admin page
app.get('/admin/movie',function(req,res){
  res.render('admin',{//把数据填充进模板，一般数据是JSON，模板是views目录下的模板文件
    title:'极客公园 后台录入页',
    movie:{
      title:'',
      doctor:'',
      country:'',
      year:'',
      poster:'',
      flash:'',
      summary:'',
      language:''
    }
  })
})

//admin update movie
app.get('/admin/update/:id',function(req,res){
  var id = req.params.id //获取id

  if(id){
    //如果id存在
    Movie.findById(id,function(err,movie){
      res.render('admin',{
        title:'imooc后台更新页',
        movie:movie
      })
    })
  }
})
//admin post movie
app.post('/admin/movie/new',function(req,res){
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie
  //判断movie是新增的还是更新的
  if(id != 'undefined'){//不是新增的
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err)
      }
      _movie = _.extend(movie,movieObj)//更新字段
      _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }

        res.redirect('/movie' + movie._id)//保存后重定义到对应的详情页
      })
    })
  }
  else{
    //新增的,调用模型的构造函数
    _movie = new Movie({
      doctor:movieObj.doctor,
      title: movieObj.title,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      summary: movieObj.summary,
      flash:movieObj.flash
    })
    _movie.save(function(err,movie){
      if(err){
        console.log(err)
      }

      res.redirect('/movie' + movie._id)//保存后重定义到对应的详情页
    })
  }
})
//加上路由 list page
app.get('/admin/list',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('list',{
    title:'极客公园 列表页',
    // movie:[{
    //   title:'机械战警',
    //   _id:1,
    //   doctor:'aaaa',
    //   country:'Amercia',
    //   year:2014,
    //   poster:'wwww.',
    //   language:'英语',
    //   flash:'http://',
    //   summary:'美剧'
    // },{
    //   title:'机械战警',
    //   _id:1,
    //   doctor:'aaaa',
    //   country:'Amercia',
    //   year:2014,
    //   poster:'wwww.',
    //   language:'英语',
    //   flash:'http://',
    //   summary:'美剧'
    // }]
    movies:movies
     })
  })
})
