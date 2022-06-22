// 这里的node的代码，会用babel处理
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath, Route} from "react-router-dom";
import express from "express";
import { Provider } from "react-redux";
import routes from "../src/APP";
import {getServerStore} from "../src/store/store";
import Header from "../src/components/Header";

const app = express();
app.use(express.static('public'))
const store = getServerStore()
app.get('*',(req,res)=>{
	// 获取根据路由渲染出的组件，并且拿到loadData方法，获取数据
	const promises = [];
// use `some` to imitate `<Switch>` behavior of selecting only
// 路由匹配
	routes.some(route=>{
		const match = matchPath(req.path,route)
		if(match){
			const {loadData} = route.component
			if(loadData){

				// 包装后
				// 规避报错 可以考虑加日志
				// const promise = new Promise((resolve,reject)=>{
				// 	loadData(store).then(resolve).catch(resolve)
				// })
				// promises.push(promise)
				promises.push(loadData(store))

			}
		}
	})

	// 等待所有网络请求结束再渲染
	Promise.all(promises).then(()=>{
		// const Page = <App></App>
		// 把react 组件解析成html
		const content = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url}>
          <Header></Header>
					{/* {App} */}
					{routes.map(route=>{
						return <Route {...route}></Route>
					})}
				</StaticRouter>
			</Provider>
		)
		// 字符串模板
		res.send(`
			<html>
				<meta charset="utf-8">
				<title>react ssr</title>
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
				<meta charset="utf-8">
				<title>react ssr</title>
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