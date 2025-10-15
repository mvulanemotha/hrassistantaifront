import { Routes, Route, Router } from "react-router-dom";
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
import HomeAdmin from "./admin/HomeAdmin";
import ProtectedAdmin from "./admin/components/ProtectedAdmin";
import AdminLayout from "./admin/components/AdminLayout";
import Processcvs from "./admin/processcvs";
import UploadProccessedCv from "./admin/UploadProccessedCv";
import Jobs from "./pages/Jobs";
import Referrals from "./pages/Referrals";
import Customers from "./admin/Customers";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/jobs" element={<Jobs />} />

      {/* admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }
      >
        {/* Admin nested routes can be added here if needed */}
        <Route index element={<HomeAdmin />} />
        <Route path="processcvs" element={<Processcvs />} />
        <Route
          path="uploadprocessedcv/:user_id/:user_name/:file_id"
          element={<UploadProccessedCv />}
        />
        <Route path="customers" element={<Customers/>}>

        </Route>
      </Route>

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
        <Route path="referrals" element={<Referrals/>} />
      </Route>
      <Route path="comparecvs" element={<ClientHome />} />
      <Route path="forgotpass" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
