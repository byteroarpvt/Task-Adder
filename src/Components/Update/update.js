import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux'
import Styles1 from "../DisplayTask/display.module.css"
import { TimeToSecConvert } from '../CommonHooks/TimeConverter';

 const Update=(props)=>{
   const {UserData}=props
   const [itemData, setitemData] = useState([]);
   const [values, setValues] = useState({
    Description:props.comparedata.task_msg,
    Date:props.comparedata.task_date,
    Time:"",
    AssignedUser:"",
    });
  useEffect(()=>{
       fetch(` https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d/${props.comparedata.id}?company_id=${UserData.results.company_id}`, {
          method:"GET",
          headers: {'Authorization': 'Bearer ' + UserData.results.token,'Accept': 'application/json','Content-Type': 'application/json',} })
         .then(response => response.json()) 
         .then(json =>setitemData(json.results) )
         .catch(err => console.log(err)) 
    
  },[])
    const handleUpdate=()=>{
      
        fetch(`https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d/${props.comparedata.id}?company_id=${UserData.results.company_id}`, {
          method: "PUT",
          body:JSON.stringify({"task_msg":values.Description,
                               "task_date":values.Date,
                               "task_time":TimeToSecConvert(values.Time),
                               "assigned_user":values.AssignedUser,
                               "is_completed":0,"time_zone":19800}),
          headers: {'Authorization': 'Bearer ' + UserData.results.token,'Accept': 'application/json','Content-Type': 'application/json',} })
         .then(response => response.json()) 
         .then(json => {
           if(json.status=== "success"){
            alert(json.message)

             props.Api()
            props.btn(false)
           }else{
             alert(json.status)
           }
         })
         .catch(err => console.log(err)) 
      }
  const handleDelete=()=>{
    fetch(`https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d/${props.comparedata.id}?company_id=${UserData.results.company_id}`, {
          method: "DELETE",
           headers: {'Authorization': 'Bearer ' + UserData.results.token,'Accept': 'application/json','Content-Type': 'application/json',} })
          .then(response => response.json()) 
          .then(json => { if(json.message=== "Deleted successfully"){
            alert(json.message)
            props.btn(false)
            props.Api()

           }else{
             alert(json.status)
           }})
          .catch(err => console.log(err))
          props.btn(false)
  }
  
  return(
    <>
      <div>
                        <div className={Styles1.container2} >
                    <div>
                      <label htmlFor="inputPassword5" className="form-label">Task description</label>
                      <input type="text" id="inputPassword5"  value={values.Description} onChange={(e)=>setValues({...values,Description:e.target.value})} className="form-control" aria-describedby="passwordHelpBlock" />
                    </div>
                    <div className={Styles1.dateTimeContainer}>
                    <div>
                      <label htmlFor="inputPassword6" className="form-label">Date </label>
                      <input type="date" id="inputPassword6" className="form-control" value={values.Date} onChange={(e)=>setValues({...values,Date:e.target.value})} aria-describedby="passwordHelpBlock" />
                    </div>
                    <div>
                      <label htmlFor="inputPassword7" className="form-label">Time </label>
                      <input type="time" id="inputPassword7" className="form-control"  value={values.Time} onChange={(e)=>setValues({...values,Time:e.target.value})} aria-describedby="passwordHelpBlock" />
                    </div>
  
                    </div>
                      <div>
                     <label htmlFor="inputPassword7" className="form-label">Assigned User </label>
                    <select className="form-select" aria-label="Default select example" value={values.AssignedUser} onChange={(e)=>setValues({...values,AssignedUser:e.target.value})}>
                       <option  value="nouser">select user</option>
                       {props.userList.results.data.map((e,i)=>(
                       <option  value={e.user_id} key={i+234}>{e.first+e.last}</option>
  
                       ))}
                     </select>
                    </div>
                    <div className={Styles1.btnContainer}>
                      <button className='d-md-block m-2' onClick={handleDelete} style={{border:"none",background:"#fff"}} ><i className="fa-solid fa-trash-can"></i></button>
                      <button className="btn d-md-block btn-primary m-2" type="button" onClick={()=>props.btn(false) }  >Cancel</button>
                      <button className="btn d-md-block btn-primary m-2" type="button" onClick={handleUpdate} >Update</button>
                   </div>
                </div>
                    </div>
    </>
  )
  
  }
  const mapStateToProps = (state) => ({
    UserData:state.Reducer.user,
    userList:state.Reducer.user2
    
  })
  
  const mapDispatchToProps=(dispatch)=>({
//   User_Data2:(payload)=>dispatch(user2(payload))
  //  User_Data2:(payload)=>dispatch(user(payload)),
  //  LoginData:(payload)=>dispatch(LogInStatus(payload))
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Update)