import Home from "./components/Home"
import Main from "./components/Main"
import Edit from "./components/Edit"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const App=()=>{
    return(
        <div>
          <BrowserRouter >
          <Main/> 
          <Routes>
            <Route element={<Home/>} path="/"/>
            <Route element={<Edit/>} path="/edit/:id"/>
          </Routes>
          </BrowserRouter>
          
        </div>
    )
}
export default App