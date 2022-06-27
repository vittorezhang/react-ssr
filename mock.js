// 单纯的模拟几个接口

const express = require('express')
const app = express()


/**
 * 前后端接口请求
 * ===============================>(跨域)
 * 浏览器=======>ssrNode=======>数据接口(mock)
 */

/**
 * ssr额外的性能损耗，日常没问题，大流量期间如何尽可能的规避，让服务稳定
 * 
 */

app.get('/api/course/list',(req,res)=>{
  // 支持跨域调用 Access-Control-Allow-Origin
  // res.header('Access-Control-Allow-Origin','*')
  // res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
  // res.header('Content-Type',"application/json;charset=utf-8")
  res.json({
    code:0,
    list:[
      {name:'我们修复bug,完善自我;',id:1},
      {name:'我们精进代码,筑起壁垒;',id:2},
      {name:'我们优化算法,突破边界;',id:3},
      {name:'我们从1到N,持续进取。',id:4},
    ]
  })
})

app.get('/api/user/info',(req,res)=>{
  // 支持跨域调用 Access-Control-Allow-Origin
  // res.header('Access-Control-Allow-Origin','*')
  // res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
  // res.header('Content-Type',"application/json;charset=utf-8")
  res.json({
    code:0,
    data:{
			name: '我的朋友',
			msg:'欢迎捧场'
		}
  })
})

app.listen('9090',()=>{
  console.log('mock启动完毕: http://localhost:8090');
})
