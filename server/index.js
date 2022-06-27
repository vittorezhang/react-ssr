// 这里的node的代码，会用babel处理
import Path from "path";
import Fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath, Route, Switch} from "react-router-dom";
import express from "express";
import { Provider } from "react-redux";
import proxy from 'http-proxy-middleware'
import config from "./config";
import routes from "../src/App";
import {getServerStore} from "../src/store/store";
import Header from "../src/components/Header";

const app = express();
app.use(express.static('public'))

// 客户端来的api开头的请求
app.use(
  '/api',
  proxy({ target: 'http://localhost:9090', changeOrigin: true })
);

const store = getServerStore()

function csrRender(res) {
	// 读取csr文件并返回
	const fileName = Path.resolve(process.cwd(),'public/index.csr.html')
	const html = Fs.readFileSync(fileName,'utf-8')
	return res.send(html)
}

app.get('*',(req,res)=>{
  // if(req.url.startsWith('/api/')){
  //   // 不渲染页面，使用axios转发 axios.get
  // }
	
	if(req.query._mode==='csr'){
		console.log('路由控制客户端渲染')
		return csrRender(res)
		// 服务器负载过高,内存占用过高
		// err.code==500
		// cpu or内存占比 降级
	}
	if(config.csr){
		console.log('csr全局开关打开')
		return csrRender(res)
	}
	// 获取根据路由渲染出的组件，并且拿到loadData方法，获取数据
	const promises = [];
// use `some` to imitate `<Switch>` behavior of selecting only
// 路由匹配
	routes.some(route=>{
		const match = matchPath(req.path,route)
		if(match){
			const {loadData} = route.component
			if(loadData){
        // 服务端报错处理
				// 1、包装后,规避报错 可以考虑加日志
        // 2、使用promise.finally()
				const promise = new Promise((resolve,reject)=>{
					loadData(store).then(resolve).catch(resolve)
				})
				promises.push(promise)
				// promises.push(loadData(store))

			}
		}
	})

	// 等待所有网络请求结束再渲染
	Promise.all(promises).then(()=>{
		// const Page = <App></App>
		const context = {
			css:[]
		}
		// 把react 组件解析成html
		const content = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
          <Header></Header>
					{/* {App} */}
          <Switch>
            {routes.map(route=>{
              return <Route {...route}></Route>
            })}
          </Switch>
				</StaticRouter>
			</Provider>
		)
		if(context.statuscode){
      // 状态的切换和页面跳转
      res.status(context.statuscode)
    }
    if(context.action === 'REPLACE'){
      // 状态的切换和页面重定向
      res.redirect(301,context.url)
    }
		const css = context.css.join('\n')
		// 字符串模板
		res.send(`
			<html>
				<head>
					<meta charset="utf-8">
					<title>react ssr</title>
					<style>
						${css}
					</style>
				</head>	
				<body>
					<div id="root">${content}</div>
					<script>
						window.__context=${JSON.stringify(store.getState())}
					</script>
					<script src="/bundle.js"></script>
				</body>
			</html>
		`)
	}).catch((err)=>{
		res.send(`
			<html>
				<head>
					<meta charset="utf-8">
					<title>react ssr</title>
				</head>			
				<body>
					<div id="root" style="text-align:center;">
						<h1>Request failed with status code 404</h1>
					</div>
				</body>
			</html>
		`)
	})
})

app.listen('8090',()=>{
	console.log('服务端已启动');
})