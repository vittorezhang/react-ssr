import React,{useState} from 'react';

function Index(props) {
	const [count,setCount] = useState(1)
	return <div>
		<h1>哈喽 !{count}</h1>
		<button onClick={()=>setCount(count + 1)}>累加</button>
	</div>
}

export default Index