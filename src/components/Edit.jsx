import {useEffect, useState} from "react"
import style from "./edit.module.css"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Edit =()=>{

    // === STATES === //
    let[name, setName]=useState("");
    let[designation, setDesignation]=useState("");
    let[salary, setSalary]=useState("");

    let {id} = useParams();
    let navigate=useNavigate();

    // === FETCHING DATA FROM SERVER === //
     useEffect(()=>{
        axios.get(`http://localhost:3000/datas/${id}`)
        .then((response)=>{
            setName(response.data.name);
            setDesignation(response.data.designation);
            setSalary(response.data.salary);
        })
     },[]
     )

    // === UPDATED THE DATA === //
    let dataUpdated=()=>{
        let payload={name,designation,salary};
        axios.put(`http://localhost:3000/datas/${id}`,payload)
        .then(()=>{
            alert("Data Updated")
        })
        .catch(()=>{
            alert("Data Not Updated")
        })
        navigate("/");
    }

   // === RESETING DATA === //
  let resetData=()=>{
    setName("");
    setDesignation("");
    setSalary("");
  }
  

    return(

        <div className={style.main}>
             <div className={style.main__editData}>
                 
                 {/* === FORM === */}
                <form className={style.main__editData__form}>

                    {/* === NAME === */}
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>

                    {/* === DESIGNATION === */}
                    <label>Designation</label>
                    <div className={style.main__select}>
                        <select value={designation} onChange={(e)=>{setDesignation(e.target.value)}}>
                            <option>Designation</option>
                            <option>Manager</option>
                            <option>IT Manager</option>
                            <option>Developer</option>
                        </select>
                    </div>

                    {/* === SALARY === */}
                    <label>Salary</label>
                    <input type="text" value={salary} onChange={(e)=>{setSalary(e.target.value)}}/>
                </form>

                {/* === BUTTONS(RESET,UPDATE) === */}
                <div className={style.main__buttons}>
                   <button className={style.main__restButton} onClick={resetData}>Reset</button>
                   <button className={style.main__saveButton} onClick={dataUpdated}>Update</button>
                </div>                 
            </div>
        </div>
    )
}
export default Edit