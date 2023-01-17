import style from "./home.module.css"
import edit from "./edit.png"
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import { useParams } from "react-router-dom"
const Home=()=>{
 
    // === STATES === //
    let[name, setName]=useState("");
    let[designation, setDesignation]=useState("");
    let[salary, setSalary]=useState("");
    let {id} = useParams()

    // === TO STORE FETCHED DATA FROM SERVER === //
    let [data, setData]=useState([]);
   
    // === SAVING THE DATA AT SERVER  === //
    let dataSave=()=>{
       
     let payload={name,designation,salary};
     axios.post("http://localhost:3000/datas", payload)
     .then(()=>{
        alert("Data Added Successfully")      
     })
     .catch(()=>{
        alert("Data Not Added")
     }) 
    }

    // === FETCHING DATA FROM SERVER === //
  useEffect(
    ()=>{
        axios.get("http://localhost:3000/datas")
        .then(
            (response)=>{
                setData(response.data)
            }
        )
    },[dataSave]
  )

  // === RESETING DATA === //
  let resetData=()=>{
    setName("");
    setDesignation("");
    setSalary("");
  }

  // === DELETING DATA FROM SERVER === // 
  let deleteData=(x)=>{
    axios.delete(`http://localhost:3000/datas/${x}`)
  }

    return(
        <div>
            {/* === IDSNEXT TITLE === */}
            <h3 className={style.idsnextTitle}>idsnext</h3>
            <div className={style.main}>
                {/* === HEADER === */}
            <h3 className={style.main__header}>React-Crud Operation</h3>

                {/* === ENTER DATA === */}
                <div className={style.main__enterData}>
                 
                 {/* === FORM === */}
                <form className={style.main__enterData__form}>

                    {/* === NAME === */}
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required/>                    
                   
                    {/* === DESIGNATION === */}
                    <label>Designation</label>
                    <div className={style.main__select}>
                       <select value={designation} onChange={(e)=>{setDesignation(e.target.value)}} required>
                           <option>Choose Your Designation</option>
                           <option>Manager</option>
                           <option>IT Manager</option>
                           <option>Developer</option>
                       </select>
                    </div>

                    {/* === SALARY === */}
                    <label>Salary</label>
                    <input type="text" value={salary} onChange={(e)=>{setSalary(e.target.value)}} required/>
                </form>

                {/* === BUTTONS (RESET,SAVE) === */}
                <div className={style.main__buttons}>
                   <button className={style.main__restButton} onClick={resetData}>Reset</button>
                   <button className={style.main__saveButton} onClick={dataSave}>Save</button>
                </div>
                  
            
                </div>

                {/* === DISPLAY DATA === */}
                <div className={style.main__displayData}>
                <table>
                       <tr>
                        <th>Name</th>
                        <th>Designaiton</th>
                        <th>Salary</th>
                        <th>Action</th>
                       </tr>
                  {
                      
                    data.map((x)=>{
                        return(                        

                            <tr>
                                 <td>{x.name}</td>
                                 <td>{x.designation}</td>
                                 <td>{x.salary}</td>
                                 <td>
                                     <i class="fa-regular fa-trash-can" onClick={()=>{deleteData(x.id)}}></i>&nbsp;&nbsp;
                                     <Link to ={`/edit/${x.id}`}><img src={edit} className={style.main__displayData__edit}/></Link>
                                 </td>
                             </tr>
                        )                       
                    })
                    
                  }

             </table>
                </div>


            </div>
        </div>
    )
}
export default Home