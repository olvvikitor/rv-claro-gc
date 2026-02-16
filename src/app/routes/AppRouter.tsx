import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardPage from "@/features/dashboard/pages/Dashboard";
import AppLayout from "@/layout/Layout";
import PrivateRoute from "./PrivateRoute";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <AppLayout />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<DashboardPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
