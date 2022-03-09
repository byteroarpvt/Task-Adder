const initialState = {
  
user:JSON.parse(localStorage.getItem("user")) ||[],
LoginStatus:false ,
user2:[]

}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "USER-DATA":
    return { ...state,user:payload}

  case "LoginStatus":
    return { ...state,LoginStatus:payload }

  case "UserData2":
    return { ...state,user2:payload}
    
  default:
    return state
  }
}
