import React from 'react';
import {Route} from 'react-router-dom';
import Index from "./container/index";
import About from "./container/about";
import User from "./container/user";

// export default (
// 	<div>
// 		<Route path='/' exact component={Index}></Route>
// 		<Route path='/about' exact component={About}></Route>
// 	</div>
// )

// 改造成js 的配置，才能获取组件

export default [
	{
		path: '/',
		component: Index,
		// loadData: Index.loadData,
		exact: false,
		key: 'index'
	},
	{
		path: '/about',
		component: About,
		exact: true,
		key: 'about'
	},
	{
    path: "/user",
    component: User,
    exact: true,
    key: 'user'
  },
]