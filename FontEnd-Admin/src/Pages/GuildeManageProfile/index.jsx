import axios from "axios";
import {
    Plus, Edit, Trash2, Save, X, Search, MapPin, Globe, DollarSign, User,
    Upload, Image as ImageIcon, Mail, Phone, Home, Award, Calendar, Briefcase, FileText
} from "lucide-react";
import { useEffect, useState } from "react";

export default function GuideManagerPageUI() {
    const [guides, setguides] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/admin/GetGuides").then((res) => setguides(res.data))
            .catch((err) => console.error(err));
    }, [])
    {
        console.log(guides)
    }
    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">Quản Lý Hồ Sơ HDV</h1>
                        <p className="text-slate-500 text-sm">Quản lý thông tin chi tiết đội ngũ hướng dẫn viên</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input placeholder="Tìm tên, SĐT..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg"><Plus size={20} /> Thêm nhân sự</button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                                <tr>
                                    <th className="p-4">Thông tin HDV</th>
                                    <th className="p-4">Liên hệ</th>
                                    <th className="p-4">Chuyên môn</th>
                                    <th className="p-4 text-right">Giá (ngày)</th>
                                    <th className="p-4 text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {guides?.map(g => (
                                    <tr key={g.id} className="hover:bg-slate-50/50 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 object-cover shadow-sm border border-gray-200 flex items-center justify-center text-slate-400 font-bold">{g.name[0]}</div>
                                                <div>
                                                    <div className="font-bold text-slate-800">{g.name}</div>
                                                    <div className="text-xs text-slate-500 flex gap-2 mt-1">
                                                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-600">{g.gender}</span>
                                                        <span>{g.dob ? new Date(g.dob).getFullYear() : "---"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1.5 text-xs">
                                                <span className="flex items-center gap-1.5 text-slate-700 font-medium"><Phone size={14} className="text-emerald-500" /> {g.phone}</span>
                                                <span className="flex items-center gap-1.5 text-slate-500"><Mail size={14} className="text-sky-500" /> {g.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1 text-xs">
                                                <span className="flex items-center gap-1 text-slate-700 font-medium"><MapPin size={14} className="text-rose-500" /> {g.location}</span>
                                                <div className="flex gap-2">
                                                    <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">{g.language}</span>
                                                    <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100">{g.style}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right font-bold text-slate-800">{Number(g.price).toLocaleString()}đ</td>
                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">
                                                <button className="p-2 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-lg transition border border-slate-200 hover:border-indigo-200" title="Sửa"><Edit size={16} /></button>
                                                <button className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-lg transition border border-slate-200 hover:border-rose-200" title="Xóa"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-10 text-center text-slate-400 flex flex-col items-center gap-2">
                            <Search size={32} className="opacity-20" /> Không tìm thấy dữ liệu
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
