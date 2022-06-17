import React from 'react';
import {Route} from 'react-router-dom';
import Index from "./container/index";
import About from "./container/about";


export default (
	<div>
		<Route path='/' exact component={Index}></Route>
		<Route path='/about' exact component={About}></Route>
	</div>
)