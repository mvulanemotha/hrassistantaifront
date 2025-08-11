import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadCvs from "./pages/UploadCvs";
import FindBestMatch from "./pages/FindBestMatch";
import Contact from "./pages/Contact";
import MatchHistory from "./pages/MatchHistory";
import CompareAdvertCv from "./pages/CompareAdvertCv";
import ProtectedRoute from "./components/ProtectedRoute";
import StartComparingFiles from "./pages/StartComparingFiles";
import AppLayout from "./components/layout/AppLayout";
import GenerateCv from "./pages/generateCv";
import StripeAddUnitsWrapper from "./wrapper/StripeAddUnitsWrapper"; // add import

function App() {

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />

      {/* Routes that use the sidebar layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="uploadcvs" element={<UploadCvs />} />
        <Route path="findmatch" element={<FindBestMatch />} />
        <Route path="matchhistory" element={<MatchHistory />} />
        <Route path="startcomparing" element={<StartComparingFiles />} />
        <Route path="addunits" element={<StripeAddUnitsWrapper />} />
        <Route path="generatecv" element={<GenerateCv />} />
      </Route>
      <Route path="comparecvs" element={<CompareAdvertCv />} />
    </Routes>
  );
}

export default App;
