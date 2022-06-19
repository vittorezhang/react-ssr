// 存储的入口
import { createStore,applyMiddleware,combineReducers } from "redux";
import thunk from "redux-thunk";
import indexReducer from "./index";

const reducer = combineReducers({
  index: indexReducer
})

// 创建store

const store = createStore(reducer,applyMiddleware(thunk))

export default store