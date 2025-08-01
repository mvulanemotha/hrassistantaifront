import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadCvs from "./pages/UploadCvs";
import FindBestMatch from "./pages/FindBestMatch";
import Contact from "./pages/Contact";
import MatchHistory from "./pages/MatchHistory";
import CompareAdvertCv from "./pages/CompareAdvertCv"; // ✅ correct
import ProtectedRoute from "./components/ProtectedRoute";
import StartComparingFiles from "./pages/StartComparingFiles";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/uploadcvs"
          element={
            <ProtectedRoute>
              <UploadCvs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/findmatch"
          element={
            <ProtectedRoute>
              <FindBestMatch />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/matchhistory"
          element={
            <ProtectedRoute>
              <MatchHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/comparecvs" element={<CompareAdvertCv />} />
        <Route path="/startcomparing" element={ <StartComparingFiles/> } />
      </Routes>
    </>
  );
}

export default App;
