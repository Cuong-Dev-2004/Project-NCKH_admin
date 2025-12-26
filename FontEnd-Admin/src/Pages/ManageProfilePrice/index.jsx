import axios from "axios";
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function ManagePrice() {
    const [bookings, setBookings] = useState([]);
    const [summary, setSummary] = useState({
        SoDuHienTai: 0,
        priceinMonth: 0,
    });

    // Lấy dữ liệu booking
    const fetchBookings = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/booking/getALLBooking");
            setBookings(res.data.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Tính toán tổng số dư và tiền tháng này
    useEffect(() => {
        const now = new Date();
        let total = 0;
        let monthTotal = 0;

        bookings.forEach((booking) => {
            const price = booking.price || 0;
            total += price;

            const bookingDate = new Date(booking.dateFrom);
            if (
                bookingDate.getMonth() === now.getMonth() &&
                bookingDate.getFullYear() === now.getFullYear()
            ) {
                monthTotal += price;
            }
        });

        setSummary({
            SoDuHienTai: total,
            priceinMonth: monthTotal,
        });
    }, [bookings]);

    // Chuẩn bị dữ liệu biểu đồ
    const chartData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        let income = 0;

        bookings.forEach((booking) => {
            const price = booking.price || 0;
            const bookingMonth = new Date(booking.dateFrom).getMonth() + 1;
            if (bookingMonth === month) {
                income += price;
            }
        });

        return {
            month: `Tháng ${month}`,
            Balance: income,
            "Tiền vào": income,
            "Tiền ra": 0,
        };
    });

    return (
        <div className="w-full p-5 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between mx-20 h-20 bg-white items-center text-center rounded-lg shadow p-4">
                <span className="text-xl font-semibold">Dashboard Tài Chính</span>
                <div>
                    <button
                        className="mx-2 px-3 py-1 bg-blue-500 text-white rounded"
                        onClick={fetchBookings}
                    >
                        Làm Mới
                    </button>
                    <span className="px-3 py-1 bg-gray-200 rounded">Tháng Này</span>
                </div>
            </div>

            {/* Tổng số dư và tiền tháng */}
            <div className="flex justify-between mx-20 h-30 items-center my-6">
                <div className="bg-white p-6 rounded-lg shadow w-1/2 mr-4">
                    <span className="block text-gray-500">Số Dư Hiện Tại</span>
                    <span className="block text-2xl font-bold">{summary.SoDuHienTai}</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow w-1/2 ml-4">
                    <span className="block text-gray-500">Tiền vào tháng này</span>
                    <span className="block text-2xl font-bold">{summary.priceinMonth}</span>
                </div>
            </div>

            {/* Biểu đồ */}
            <div className="mx-20 my-10 bg-white p-5 rounded-lg shadow">
                <h3 className="mb-5 text-lg font-semibold">Dòng tiền hàng tháng</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Balance" stroke="#00C49F" />
                        <Line type="monotone" dataKey="Tiền ra" stroke="#FF8042" />
                        <Line type="monotone" dataKey="Tiền vào" stroke="#0088FE" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ManagePrice;
