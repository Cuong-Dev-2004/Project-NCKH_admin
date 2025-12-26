import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/index.jsx";
import HomePage from "../Pages/HomePage/HomePage.jsx";
import GuideStatusPageUI from "../Pages/ManageQualidy/index.jsx";
import GuideManagerPageUI from "../Pages/GuildeManageProfile/index.jsx";
import ManagerAccount from "../Pages/ManageAccount/index.jsx";
import ManagerTours from "../Pages/ManageTours/index.jsx";
import ManagePrice from "../Pages/ManageProfilePrice/index.jsx";
import SignIn from "../Pages/SiginIn/index.jsx";

export default function Router() {
    return (
        <Routes>

            <Route path="/" element={<SignIn />} />


            <Route path="/app" element={<Layout />}>
                <Route path="ManageGiaoDich" element={<HomePage />} />
                <Route path="guides" element={<GuideStatusPageUI />} />
                <Route path="manage" element={<GuideManagerPageUI />} />
                <Route path="manageAccount" element={<ManagerAccount />} />
                <Route path="ManagerTours" element={<ManagerTours />} />
                <Route path="Report" element={<ManagePrice />} />
                <Route index element={<Navigate to="ManageGiaoDich" />} />
            </Route>


            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
