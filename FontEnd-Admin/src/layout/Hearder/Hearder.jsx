import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../auth/HandleToken";

const ALL_TABS = [
    { value: "list", label: "Quản Lý Giao Dịch", to: "/app/ManageGiaoDich", roles: ["admin"] },
    { value: "guides", label: "Trạng thái HDV", to: "/app/guides", roles: ["admin"] },
    { value: "ManagerAccount", label: "Quản Lý Tài Khoản", to: "/app/manageAccount", roles: ["admin", "staff"] },
    { value: "ManagerTours", label: "Quản Lý Tours", to: "/app/ManagerTours", roles: ["admin", "staff"] },
    { value: "Report", label: "Báo Cáo Danh Thu", to: "/app/Report", roles: ["admin", "staff"] },
];

function Header() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role") || "admin";

    const visibleTabs = ALL_TABS.filter(tab => tab.roles.includes(role));
    const handleLogout = () => {
        removeToken("token");
        navigate("/");
    };
    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200">
            <div className="max-w-[1400px] mx-auto px-5 py-4 flex items-center justify-between">

                <h1 className="text-2xl font-bold">Hệ thống quản trị</h1>

                <nav className="flex gap-2 bg-slate-100 p-1 rounded-xl border">
                    {visibleTabs.map(tab => (
                        <Link key={tab.value} to={tab.to}>
                            <button className="px-4 py-2 rounded-lg text-sm hover:bg-white">
                                {tab.label}
                            </button>
                        </Link>
                    ))}
                </nav>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-xl border" onClick={() => { handleLogout() }}>
                    Đăng Xuất
                </div>

            </div>
        </header>
    );
}

export default Header;
