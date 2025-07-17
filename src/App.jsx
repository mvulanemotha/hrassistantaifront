import { Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import UploadCvs from "./pages/UploadCvs"
import FindBestMatch from "./pages/FindBestMatch"
import Contact from "./pages/Contact"
import MatchHistory from "./pages/MatchHistory"

function App() {
  
  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/uploadcvs" element={<UploadCvs/>} />
        <Route path="/findmatch" element={<FindBestMatch/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/matchhistory" element={ <MatchHistory/> } />
     </Routes>
    </>
  )
}

export default App
