import axios from "axios";
import {
    Search, UserCheck, UserX, Users, MapPin, Globe, RefreshCcw, CheckCircle, XCircle,
    Beaker
} from "lucide-react";
import { useEffect, useState } from "react";
import { getToken } from "../../auth/HandleToken";

export default function GuideStatusPageUI() {
    const [guides, setguides] = useState([]);

    useEffect(() => {
        const token = getToken();
        axios.get("http://localhost:3000/api/admin/GetGuides",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        ).then((res) => setguides(res.data.guides))

            .catch((err) => console.error(err));
    }, [])
    {


        console.log(guides)
    }
    const setBaoBan = async (id) => {
        try {
            const string = getToken();

            const res = await axios.put(
                "http://localhost:3000/api/admin/UpdateGuide",
                { id },
                {
                    headers: { Authorization: string }
                }
            );


            setguides(prev =>
                prev.map(g =>
                    g._id === id ? res.data.guide : g
                )
            );

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">Quản Lý Trạng Thái HDV</h1>
                        <p className="text-slate-500 text-sm mt-1">Dữ liệu được lưu tự động</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 rounded-xl text-sm hover:bg-indigo-50 text-indigo-700 shadow-sm transition font-bold">
                        <RefreshCcw size={16} /> Nạp lại dữ liệu gốc
                    </button>
                </div>

                {/* Thống kê */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Tổng số HDV" value={guides.length} icon={Users} color="bg-indigo-50 text-indigo-600" />
                    <StatCard title="Đang rảnh" value={1} icon={UserCheck} color="bg-emerald-50 text-emerald-600" />
                    <StatCard title="Đang bận" value={1} icon={UserX} color="bg-rose-50 text-rose-600" />
                </div>

                {/* Tìm kiếm & Lọc */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input placeholder="Tìm tên HDV..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="flex gap-2">
                        <FilterBtn label="Tất cả" active />
                        <FilterBtn label="Rảnh" />
                        <FilterBtn label="Bận" />
                    </div>
                </div>

                {/* Danh sách HDV */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide) => {
                        const isAvailable = guide.availability?.some(a => a.isAvailable);

                        return (
                            <div
                                key={guide._id}
                                className={`bg-white rounded-2xl p-5 shadow-sm border transition-all 
        ${isAvailable ? 'border-slate-100' : 'border-rose-200 bg-rose-50/40'}`}
                            >
                                <div className="flex items-start gap-4">
                                    <img
                                        src={guide.image || `https://ui-avatars.com/api/?name=${guide.fullName}`}
                                        onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${guide.fullName}`}
                                        className={`w-16 h-16 rounded-full object-cover ring-4 
            ${isAvailable ? 'ring-emerald-100' : 'ring-rose-100 grayscale'}`}
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800 text-lg">{guide.fullName}</h3>

                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                            <MapPin size={12} /> {guide.location}
                                            •
                                            <Globe size={12} /> {guide.languages?.join(", ")}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div
                                        className={`text-xs font-bold uppercase px-3 py-1 rounded-full 
            ${isAvailable ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-rose-100 text-rose-700'}`}
                                    >
                                        {isAvailable ? "Đang rảnh" : "Đang bận"}
                                    </div>
                                    <div>
                                        <span
                                            onClick={() => setBaoBan(guide._id)}
                                            className={`text-xs font-bold uppercase px-3 py-1 cursor-pointer
  ${!isAvailable ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-50'
                                                    : 'bg-rose-100 text-rose-700 hover:bg-rose-50'}`}>
                                            {isAvailable ? "Báo Bận" : "Báo Rảnh"}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}><Icon size={24} /></div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-extrabold text-slate-800">{value}</p>
            </div>
        </div>
    );
}

function FilterBtn({ label, active }) {
    return <button className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${active ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200"}`}>{label}</button>;
}
