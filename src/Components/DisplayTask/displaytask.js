import React,{useEffect,useState} from 'react';
import Styles1 from "./display.module.css"
import { connect } from 'react-redux'
import {  user2 } from '../../redux/action/actions';
import Update from '../Update/update';

const DisplayTask = (props) => {
// console.log(props)
  const {results}=props.UserData
   const [editPage, setEditPage] = useState(props.vData);
   const [compare,setCompare] =useState([])
   const [tasks, setTasks] = useState([]);
  
   const handleClose=(e)=>{
        setEditPage(e)
   }
    const handleEdit=(sData)=>()=>{
        setCompare(sData)
        setEditPage(true)
    }
     const api=()=>{
      fetch(`https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d?company_id=${results.company_id}`, {
        method: "GET",
        headers: {'Authorization': 'Bearer ' + results.token,'Accept': 'application/json','Content-Type': 'application/json',} })
       .then(response => response.json()) 
       .then(res=>
        (setTasks(res.results),
       props.TaskLength(res.results))
       )
       
        .catch(err => console.log(err)) 
        
    }
    {!props.svaebtn&& setTimeout(api(),1000) }
    useEffect(()=>{
    api()
  },[])
    return ( 
          <div className={Styles1.container}>
             { !editPage &&<div className={Styles1.container}>
              {tasks.map((e,i)=>(
                  <div key={i+23486} className={Styles1.card}>
                  <div>
                     <img width="50px" height="50px" src="http://www.gravatar.com/avatar/cf94b74bd41b466bb185bd4d674f032b?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png" alt="" />
                 </div>
                 <div>
                     <h6>{e.task_msg}</h6>
                     <p>{e.task_date}</p>
                 </div>
                 <div className={Styles1.editContainer} onClick={handleEdit({...e})}   >
                 <i className="fa-solid fa-pen"></i>
                 </div>
                  </div>
              ))}
              </div>}
              {editPage&&
                 <Update btn={handleClose} comparedata={compare} Api={api} />
                
              }
             
          </div>
     );
}
const mapStateToProps = (state) => ({
  UserData:state.Reducer.user,
  userList:state.Reducer.user2
  
})

const mapDispatchToProps=(dispatch)=>({
User_Data2:(payload)=>dispatch(user2(payload))
//  User_Data2:(payload)=>dispatch(user(payload)),
//  LoginData:(payload)=>dispatch(LogInStatus(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTask)
