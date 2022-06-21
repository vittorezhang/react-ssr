import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import routes from '../src/APP'
import {getClientStore} from "../src/store/store";

const store = getClientStore()
// 注水 客户端入口
const Page = (<Provider store={store}>
    <BrowserRouter>
      {/* {App} */}
			{routes.map(route=>{
				<Route {...route}></Route>
			})}
    </BrowserRouter>
  </Provider>)

ReactDom.hydrate(Page,document.getElementById('root'))