import { Outlet } from "react-router-dom";
import Header from "./Hearder/Hearder";

function Layout() {
    return (
        <div className="min-h-screen   bg-slate-50">
            <Header />
            <main className=" w-full max-w-[1400px] mx-auto px-5 py-6">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
