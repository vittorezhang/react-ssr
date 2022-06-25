import React from 'react'
import {Route} from 'react-router-dom'

function Status({code, children}){
  return <Route render={({staticContext})=>{
    if(staticContext){
      staticContext.statuscode=code // 404
    }
    return children
  }}></Route>
}


function Notfound(props){
  // console.log('noutound',props)
  // 渲染了这个组件，给staticContext赋值， statuscode=404
  return <Status code={404}>
    <div style={{textAlign:'center'}}>
      <h1>大兄弟瞅啥呢</h1>
      <img id='img-404' src="/404.jpg" alt=""/>
    </div>
  </Status>
}

export default Notfound