import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadCvs from "./pages/UploadCvs";
import FindBestMatch from "./pages/FindBestMatch";
import Contact from "./pages/Contact";
import MatchHistory from "./pages/MatchHistory";
import ClientHome from "./pages/ClientHome";
import ProtectedRoute from "./components/ProtectedRoute";
import StartComparingFiles from "./pages/StartComparingFiles";
import AppLayout from "./components/layout/AppLayout";
import GenerateCv from "./pages/generateCv";
import AddUnits from "./pages/AddUnits";
import Settings from "./pages/Settings";
import Chargies from "./pages/Chargies";
import LowScoreExplanation from "./pages/Explanation";
import ForgotPassword from "./pages/ForgotPassword";
import Notification from "./pages/Notification";

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
        <Route path="addunits" element={<AddUnits />} />
        <Route path="generatecv" element={<GenerateCv />} />
        <Route path="settings" element={<Settings />} />
        <Route path="chargies" element={<Chargies />} />
        <Route path="lowscoreresult" element={<LowScoreExplanation />} />
        <Route path="notifications" element={<Notification />} />
      </Route>
      <Route path="comparecvs" element={<ClientHome />} />
      <Route path="forgotpass" element={ <ForgotPassword/> } />
    </Routes>
  );
}

export default App;
