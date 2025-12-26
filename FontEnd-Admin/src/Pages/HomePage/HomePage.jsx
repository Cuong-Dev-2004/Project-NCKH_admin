import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
    const [form, setForm] = useState({ input: "" });
    const [listBooking, setListBooking] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingStatus, setEditingStatus] = useState("");


    const fetchBookings = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/booking/getALLBooking");
            setListBooking(res.data.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);


    const handleDelete = async (id) => {
        if (!confirm("Bạn có chắc muốn xóa booking này?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/booking/${id}`);
            fetchBookings();
        } catch (err) {
            console.error(err);
        }
    };


    const handleEditStatus = (id, currentStatus) => {
        setEditingId(id);
        setEditingStatus(currentStatus);
    };


    const handleSaveStatus = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/booking/${id}`, { status: editingStatus });
            setEditingId(null);
            setEditingStatus("");
            fetchBookings();
        } catch (err) {
            console.error(err);
        }
    };

    // Lọc theo input
    const filteredBookings = listBooking.filter(item => {
        const keyword = form.input.toLowerCase();
        const customerName = item.touristId?.username || "Khách Lẻ";
        const guideName = item.guideId?.fullName || "";
        const tourName = item.tourId?.name || "";
        const code = item._id.slice(-10);
        return (
            customerName.toLowerCase().includes(keyword) ||
            guideName.toLowerCase().includes(keyword) ||
            tourName.toLowerCase().includes(keyword) ||
            code.toLowerCase().includes(keyword)
        );
    });

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">
            <div className="max-w-[1400px] mx-auto">

                {/* SEARCH */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="🔍 Tìm theo mã, tên khách, HDV, tour..."
                        className="w-full p-3 rounded-xl border border-blue-200 bg-white focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                        value={form.input}
                        onChange={e => setForm({ ...form, input: e.target.value })}
                    />
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    {/* HEADER */}
                    <div className="grid grid-cols-5 font-semibold text-white bg-blue-600 p-4">
                        <div>Khách hàng</div>
                        <div>Tour & Thời gian</div>
                        <div className="text-center">Tổng tiền</div>
                        <div className="text-center">Trạng thái</div>
                        <div className="text-center">Hành động</div>
                    </div>

                    {/* ROWS */}
                    {filteredBookings.map(item => {
                        const customerName = item.touristId?.username || "Khách Lẻ";
                        const guideName = item.guideId?.fullName || "Chưa chọn";
                        const tourName = item.tourId?.name || "Tour Không Xác Định";
                        const totalDays = item.days || Math.max(1,
                            Math.ceil((new Date(item.dateTo) - new Date(item.dateFrom)) / (1000 * 60 * 60 * 24))
                        );

                        return (
                            <div
                                key={item._id}
                                className="grid grid-cols-5 p-4 border-b hover:bg-blue-50 transition-colors items-center"
                            >
                                {/* Khách hàng */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-full font-bold text-blue-600">
                                            {customerName[0]}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-700">{customerName}</div>
                                            <div className="text-xs text-slate-500">{item._id.slice(-10)}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-slate-500 mt-1">HDV: {guideName}</div>
                                </div>

                                {/* Tour */}
                                <div>
                                    <div className="font-medium text-slate-700">{tourName}</div>
                                    <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                        {new Date(item.dateFrom).toLocaleDateString()} • {totalDays} ngày
                                    </div>
                                </div>

                                {/* Tổng tiền */}
                                <div className="text-center font-semibold text-blue-600">
                                    {item.price ? item.price.toLocaleString("vi-VN") + "đ" : "—"}
                                </div>

                                {/* Trạng thái */}
                                <div className="flex justify-center items-center">
                                    {editingId === item._id ? (
                                        <select
                                            value={editingStatus}
                                            onChange={e => setEditingStatus(e.target.value)}
                                            className="px-2 py-1 border rounded"
                                        >
                                            <option value="Pending">Chờ</option>
                                            <option value="Confirmed">Xác nhận</option>
                                            <option value="Canceled">Đã hủy</option>
                                        </select>
                                    ) : (
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${item.status === "Confirmed" ? "bg-green-100 text-green-700" : ""}
                                            ${item.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                                            ${item.status === "Canceled" ? "bg-red-100 text-red-700" : ""}
                                        `}>
                                            {item.status === "Canceled" ? "Đã hủy" : item.status === "Confirmed" ? "Xác nhận" : "Chờ"}
                                        </div>
                                    )}
                                </div>

                                {/* Hành động */}
                                <div className="flex justify-center items-center gap-2">
                                    {editingId === item._id ? (
                                        <button
                                            onClick={() => handleSaveStatus(item._id)}
                                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                        >
                                            Lưu
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditStatus(item._id, item.status)}
                                            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                                        >
                                            Sửa
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
