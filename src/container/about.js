import React from 'react';
import styles from "./about.css";
// console.log(styles._getCss());
function About(props) {
	if(props.staticContext){
		props.staticContext.css.push(styles._getCss())
	}
	return <div>
		<h1 className={styles.title}>这是关于页面</h1>
	</div>
}

export default About