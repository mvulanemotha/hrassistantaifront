import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({children}){

    const isAuthenticated = localStorage.getItem("name");

    return isAuthenticated ? children : <Navigate to="/login" replace />

}