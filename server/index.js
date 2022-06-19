// 这里的node的代码，会用babel处理
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { Provider } from "react-redux";
import App from "../src/APP";
import store from "../src/store/store";

const app = express();
app.use(express.static('public'))

app.get('*',(req,res)=>{
	// const Page = <App></App>
	// 把react 组件解析成html
	const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        {App}
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
				<script src="/bundle.js"></script>
			</body>
		</html>
	`)
})

app.listen('8090',()=>{
	console.log('服务端已启动');
})