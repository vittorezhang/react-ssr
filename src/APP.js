import React,{useEffect} from 'react';

function App(params) {
	const [count,setCount] = useEffect(1)
	return <div>
		<h1>哈喽 {props.title} !{count}</h1>
		<
		<button onClick={()=>setCount(count + 1)}>累加</button>
	</div>
}

export default <App title="ssr 服务端渲染"></App>