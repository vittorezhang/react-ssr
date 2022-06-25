import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import {getUserInfo} from '../store/user'

function User(props){
  // 判断是否登录 
  // cookie localStorage

  return (
    <Redirect to={'/'}>
      <div>
        <h1>
          你好呀,{props.userinfo.name},{props.userinfo.msg}，哈哈!
        </h1>
      </div>
    </Redirect>
  )
}
User.loadData = (store)=>{
  return store.dispatch(getUserInfo())
}
export default connect(
  state=>{
    return {
      userinfo:state.user.userinfo
    }
  }
)(User)
