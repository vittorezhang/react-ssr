import React from "react";
function withStyle(Comps,styles) {
	return function (props) {
		if(props.staticContext){
			props.staticContext.css.push(styles._getCss())
		}
		return <Comps {...props}/>
	}
}

export default withStyle