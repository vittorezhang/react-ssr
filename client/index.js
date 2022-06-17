import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from '../src/APP'

// 注水 客户端入口
const Page = (
	<BrowserRouter>
		{App}
	</BrowserRouter>
)
ReactDom.hydrate(Page,document.getElementById('root'))