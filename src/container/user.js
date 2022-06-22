import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'

function User(props){
  return<div>
    <h1>
      你好呀,{props.userinfo.name},{props.userinfo.msg}，哈哈!
    </h1>
  </div>
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
