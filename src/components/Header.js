import React from "react";
import { Link } from "react-router-dom";

export default ()=>{
  return <div>
    <Link to={'/'}>首页</Link>
      <span style={{padding: 10}}>|</span>
    <Link to={'/about'}>关于</Link>
			<span style={{padding: 10}}>|</span>
		<Link to={'/user'}>用户信息</Link>
  </div>
}