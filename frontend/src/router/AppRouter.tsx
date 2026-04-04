import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentsPage from '../pages/StudentsPage';
import StudentFormPage from '../pages/StudentFormPage'
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
    
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/create" element={<StudentFormPage />} />
            <Route path="/edit/:id" element={<StudentFormPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            // показати студентів, 
            //якщо є токєн в localStorage
            <Route
                path="/"
                element={
                    <ProtectedRoute 
                        children={<StudentsPage />}>
                    </ProtectedRoute>
                } />
        </Routes>
    </BrowserRouter>
    )
}

export default AppRouter