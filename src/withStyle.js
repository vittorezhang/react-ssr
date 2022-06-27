import React from "react";
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

function withStyle(Comps,styles) {
	function NewComps (props) {
		if(props.staticContext){
			props.staticContext.css.push(styles._getCss())
		}
		return <Comps {...props}/>
	}
  NewComps.loadData = Comps.loadData
  return NewComps
}

export default withStyle