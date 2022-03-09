import React from 'react';
import Header from './Components/Header/Header';
import Login from './Components/Login/login';
import Task from './Components/Task/task';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux'
const App = (props) => {
  return (
    <>
      <BrowserRouter>
      <Header />

      <Routes>
     
        {!props.Login_Status&& <Route exact path='/' element={<Login />} /> }
        {props.Login_Status&& <Route path="/Home" element={<Task />} /> }

        
      </Routes>
      </BrowserRouter>
    </>
  )
}
const mapStateToProps = (state) => ({
   Login_Status:state.Reducer.LoginStatus 
   
})

const mapDispatchToProps=(dispatch)=>({

  


})

export default connect(mapStateToProps, mapDispatchToProps)(App)