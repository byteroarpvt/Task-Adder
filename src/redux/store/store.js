import { combineReducers, createStore } from "redux";
import Reducer from "../reducer/reducer"


const rootReducer=combineReducers({Reducer})

const store=createStore(rootReducer)

export default store;