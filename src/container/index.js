import React,{useState,useEffect} from 'react';
import { connect } from "react-redux";
import { getIndexList } from "../store/index";
import styles from "./index.css";
import withStyle from "../withStyle.js";
function Index(props) {
	const [count,setCount] = useState(1)
  useEffect(()=>{
		// 异步数据首页显示
    if(!props.list.length){
      props.getIndexList()
    }
  },[])
	return <div className={styles.container}>
		<h1 className={styles.title}>哈喽呀 !{count}</h1>
		<button onClick={()=>setCount(count + 1)}>累加</button>
    <hr/>
      <ul>
        {props.list.map(item=>{
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
	</div>
}


/**
 * 问题: withStyle高阶组件，导致loadData 失效 
 * 解决方案1: 调整代码执行顺序，先使用withStyle高阶组件，后添加loadData 
 */

let NewIndex =  connect(
  state => ({list: state.index.list}),
  {getIndexList}
)(withStyle(Index,styles))


NewIndex.loadData = (store)=>{
	return store.dispatch(getIndexList())
}

export default NewIndex

