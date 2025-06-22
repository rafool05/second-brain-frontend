
import './App.css'
import { Home } from './ui/components/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Default } from './ui/components/Default'
import { Signup } from './ui/components/Signup'
import { Signin } from './ui/components/Signin'
function App() {
return (
  <BrowserRouter>
    <Routes>
        <Route path = "/" element = {<Default/>}/>
        <Route path = "/signup" element = {<Signup></Signup>}/>
        <Route path = "/signin" element = {<Signin></Signin>}/>
        <Route path = "/home" element = {<Home></Home>}/>
    </Routes>
  </BrowserRouter>
)
  

}

export default App
