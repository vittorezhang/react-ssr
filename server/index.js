// 这里的node的代码，会用babel处理
import React from "react";
import { renterToString } from "react-dom/server";
import express from "express";
import App from "../src/APP";

const app = express();

app.get('/',(req,res)=>{
	const Page = <App></App>
	// 把react 组件解析成html
	const content = renterToString(Page)
	// 字符串模板
	res.send(`
		<html>
			<meta charset="utf-8">
			<title>react ssr</title>
			<body>
				<div id="root">${content}</div>
			</body>
		</htnl>
	`)
})

app.listen('8090',()=>{
	console.log('服务端已启动');
})