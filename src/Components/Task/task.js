import React,{useEffect,useState} from 'react';
import DisplayTask from '../DisplayTask/displaytask';
import Styles from "./Task.module.css";
import { TimeToSecConvert } from '../CommonHooks/TimeConverter';
import { connect } from 'react-redux'
import {  user2 } from '../../redux/action/actions';


const Task = (props) => {
    const {results}=props.UserData
    const [ShowTask, setShowTask] = useState(false);
    const [Length, setLength] = useState(0);
    const [values, setValues] = useState({
        Description:"",
        Date:"",
        Time:"",
        AssignedUser:"",
    });
    const TotalTaskLenght=(e)=>{
      setLength(e.length)
    }
       useEffect(()=>{
          fetch(`https://stage.api.sloovi.com/team?product=outreach&company_id=${results.company_id}`, {
           method: "GET",
           headers: {'Authorization': 'Bearer ' + results.token,'Accept': 'application/json','Content-Type': 'application/json',} })
          .then(response => response.json()) 
          .then(json => { 
            if(json.status==="success"){
                props.User_Data2(json)    
            }else{
               alert(json.message)
            }
            })
          .catch(err => console.log(err)) 
        

        },[])
     const handleSave=()=>{
        fetch(`https://stage.api.sloovi.com/task/lead_cb11a91b1bff4c42806b5c8dea51425d?company_id=${results.company_id}`, {
            method: "POST",
            body:JSON.stringify({"task_msg":values.Description,
                                 "task_date":values.Date,
                                 "task_time":TimeToSecConvert(values.Time),
                                 "assigned_user":values.AssignedUser,
                                 "is_completed":0,"time_zone":19800}),
            headers: {'Authorization': 'Bearer ' +results.token,'Accept': 'application/json','Content-Type': 'application/json',} })
           .then(response => response.json()) 
           .then(json => console.log(json))
           .catch(err => console.log(err)) 
            setShowTask(false)
     }

    return ( 
        <div className={Styles.container}>
             <div className={Styles.container1}>
               <div className={Styles.box1}>
                      Tasks:{Length}
                </div>
               <div className={Styles.box2} onClick={()=>setShowTask(true)}>
               <i className="fa-solid fa-plus"></i>
               </div>
              </div>
     {ShowTask && <div className={Styles.container2} >
                  <div>
                    <label htmlFor="inputPassword5" className="form-label">Task description</label>
                    <input type="text" id="inputPassword5" value={values.Description} onChange={(e)=>setValues({...values,Description:e.target.value})} className="form-control" aria-describedby="passwordHelpBlock" />
                  </div>
                  <div className={Styles.dateTimeContainer}>
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
                  <div className={Styles.btnContainer}>
                    <button className="btn d-md-block btn-primary m-2" type="button" onClick={()=>setShowTask(false)} >Cancel</button>
                    <button className="btn d-md-block btn-primary m-2" type="button" onClick={handleSave}>Save</button>
                 </div>
              </div>}
              <DisplayTask  TaskLength={TotalTaskLenght} svaebtn={ShowTask}  />
        </div>
     );
}
const mapStateToProps = (state) => ({
  UserData:state.Reducer.user,
  userList:state.Reducer.user2
  
})

const mapDispatchToProps=(dispatch)=>({
User_Data2:(payload)=>dispatch(user2(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(Task)