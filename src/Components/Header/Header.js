import React from 'react';
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { LogInStatus } from '../../redux/action/actions';
const Header = (props) => {
   const navigate=useNavigate()
   const handleLogOut=()=>{
      localStorage.removeItem("user")
      props.LogInStatus(false)
      navigate("/")

   }
    return ( 
        <div>
            <nav className="navbar navbar-light bg-light">
              <div className="container-fluid">
                { props.Login_Status &&  <Link to="/Home" className="navbar-brand" >Navbar</Link> }
                { !props.Login_Status &&  <Link to="/" className="navbar-brand" >Navbar</Link> }
                 { !props.Login_Status && <button className="btn btn-outline-success" type="submit">LogIn</button>}
                 {props.Login_Status && <button className="btn btn-outline-success" onClick={handleLogOut} type="submit">LogOut</button>}

              </div>
           </nav>
        </div>
     );
}
const mapStateToProps = (state) => ({
    
   Login_Status:state.Reducer.LoginStatus 
   
   
})

const mapDispatchToProps = (dispatch)=>({
   LogInStatus:(payload)=>dispatch(LogInStatus(payload))
})



export default connect(mapStateToProps, mapDispatchToProps)(Header)
