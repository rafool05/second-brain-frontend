
import './App.css'
import { Home } from './ui/components/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Default } from './ui/components/Default'
import { Signup } from './ui/components/Signup'
import { Signin } from './ui/components/Signin'
import { ProtectedRoutes } from './ui/components/ProtectedRoutes'
import { AuthProvider } from './ui/components/AuthProvider'
import { PublicRoutes } from './ui/components/PublicRoutes'
function App() {
return (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Default/>}/>
          <Route path = "/signup" element = {<PublicRoutes><Signup></Signup></PublicRoutes>}/>
          <Route path = "/signin" element = {<PublicRoutes><Signin></Signin></PublicRoutes>}/>
          <Route path = "/home" element = {<ProtectedRoutes><Home></Home></ProtectedRoutes>}/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
  

}

export default App
