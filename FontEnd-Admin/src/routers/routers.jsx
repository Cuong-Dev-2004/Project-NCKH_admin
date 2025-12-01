import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/index.jsx";
import HomePage from "../Pages/HomePage/HomePage";


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    );
}