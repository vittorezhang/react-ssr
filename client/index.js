import React from "react";
import ReactDom, { hydrate } from "React-dom";

import App from '../src/APP'

// 注水

ReactDom,hydrate(App,document,getElementById('root'))