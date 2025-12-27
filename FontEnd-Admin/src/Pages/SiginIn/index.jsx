import axios from "axios";
import { useState } from "react";
import { getToken, setToken } from "../../auth/HandleToken";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(""); // để hiển thị lỗi

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:3000/api/auth/Login", form);
            if (res.data.token) {
                setToken("tokenAdmin", res.data.token);
                navigate("/app/ManageGiaoDich");
            } else {
                setError("Đăng nhập thất bại");
            }
        } catch (err) {
            console.error(err);
            setError("Tên đăng nhập hoặc mật khẩu không đúng");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label className="block mb-2 text-gray-700">Tên đăng nhập</label>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Cuong123"
                    className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <label className="block mb-2 text-gray-700">Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••"
                    className="w-full px-3 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Đăng Nhập
                </button>
            </form>
        </div>
    );
}

export default SignIn;
