// 首页的逻辑

import Axios from "axios"

// actionType
const GET_LIST = 'INDEX/GET_LIST'

// actionCreator
const changeList = list =>({
  type: GET_LIST,
  list
})

const getIndexList = server =>{
  return (dispatch,getState,actionInstance)=>{
    return Axios.get(`http://localhost:9090/course/list`).then(res=>{
      const {list} = res.data
      dispatch(changeList(list))
    })
  }
}

const defaultState = {
  list:[]
}

export default (state = defaultState,action)=>{
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        list:action.list
      }
      return newState
    default:
      return state
  }
} 