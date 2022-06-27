import React from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
// 方案1
// function withStyle(Comps,styles) {
// 	return function (props) {
// 		if(props.staticContext){
// 			props.staticContext.css.push(styles._getCss())
// 		}
// 		return <Comps {...props}/>
// 	}
// }

// export default withStyle

// 方案2

// function withStyle(Comps,styles) {
// 	function NewComps (props) {
// 		if(props.staticContext){
// 			props.staticContext.css.push(styles._getCss())
// 		}
// 		return <Comps {...props}/>
// 	}
//   NewComps.loadData = Comps.loadData
//   return NewComps
// }

// export default withStyle

// 方案3，使用react 官方文档进阶指导提供的hoist-non-react-statics

function withStyle(Comps,styles) {
	function NewComps (props) {
		if(props.staticContext){
			props.staticContext.css.push(styles._getCss())
		}
		return <Comps {...props}/>
	}
  hoistNonReactStatic(NewComps,Comps)
  return NewComps
}

export default withStyle