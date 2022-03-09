import React,{useState} from 'react';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { LogInStatus, user } from '../../redux/action/actions';

const Login = (props) => {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("");
   const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        fetch('https://stage.api.sloovi.com/login', {
               method: "POST",
                body: JSON.stringify({email:email,password:password}),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',}
                   })
             .then(response => response.json()) 
             .then(res =>{ 
                if(res.status==="success"){
                  localStorage.setItem("user",JSON.stringify(res))
                  props.User_Data(res)
                  props.LoginData(true)

                  navigate("/Home")
                }else{
                   alert(res.message)
                   props.LoginData(false)
                }
                }
                )
             

             .catch(err=>console.log(err))
    }

    return ( 
        <div className='loginContainer'>
         <div>  
        <h1>Login Page</h1>
        <form className="col g-3" onSubmit={handleSubmit}  >
            <div className="col-auto my-3">
               <label htmlFor="inputEmail2" className="visually-hidden">Email</label>
               <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control p-3" id="inputEmail2" placeholder="email@example.com" />
           </div>
           <div className="col-auto my-3">
                <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="form-control p-3" id="inputPassword2" placeholder="Password" />
           </div>
           <div className="col-auto my-3 justify-content-center">
                <button type="submit" className="btn btn-primary mb-3 px-5 py-2 d-block m-auto">Submit</button>
           </div>
        </form>
        </div> 
        </div>
     );
}
 

const mapStateToProps = (state) => ({
   Login_Status:state.Reducer.LoginStatus 
   
})

const mapDispatchToProps=(dispatch)=>({

  User_Data:(payload)=>dispatch(user(payload)),
  LoginData:(payload)=>dispatch(LogInStatus(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(Login)