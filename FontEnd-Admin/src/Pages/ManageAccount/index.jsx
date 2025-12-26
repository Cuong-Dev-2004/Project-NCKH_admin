import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../../auth/HandleToken";

export default function ManagerAccount() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: ""
    });

    const token = getToken();

    useEffect(() => {
        axios.get("http://localhost:3000/api/admin/getAllUser", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setUsers(res.data.users || []);
                setLoading(false);
            })
            .catch(err => {
                setError("Không thể tải danh sách người dùng");
                setLoading(false);
                console.error(err);
            });
    }, []);

    const handleEdit = (u) => {
        setFormData({
            username: u.username,
            email: u.email,
            role: u.role
        });
        setEditingUser(u._id);
    };



    const deleteAccount = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá?")) return;

        try {
            await axios.post(
                "http://localhost:3000/api/admin/RmUser",
                { id },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setUsers(prev => prev.filter(u => u._id !== id));

            alert("Xoá thành công");

        } catch (err) {
            console.error(err);
            alert("Lỗi khi xoá user");
        }
    };


    return (
        <div className="p-6 bg-slate-50 min-h-screen">

            <h1 className="text-2xl font-bold mb-4">Quản lý tài khoản</h1>

            {loading && <p> Đang tải...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="bg-white rounded-xl shadow p-4 border">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Tên đăng nhập</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Vai trò</th>
                            <th className="p-3 text-center">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u, i) => (
                            <tr key={u._id} className="border-b hover:bg-slate-50">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3 font-semibold">{u.username}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">
                                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleEdit(u)}
                                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg mr-2 font-bold">
                                        Sửa
                                    </button>

                                    <button
                                        onClick={() => deleteAccount(u._id)}
                                        className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg font-bold">
                                        Xóa
                                    </button>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingUser && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-6 shadow-xl w-[420px]">

                        <h2 className="text-xl font-bold mb-4">
                            Sửa tài khoản
                        </h2>

                        <div className="space-y-3">

                            <div>
                                <label className="text-sm font-bold">Username</label>
                                <input
                                    className="w-full border rounded-lg p-2 mt-1"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold">Email</label>
                                <input
                                    className="w-full border rounded-lg p-2 mt-1"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold">Role</label>
                                <select
                                    className="w-full border rounded-lg p-2 mt-1"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="staff">Staff</option>
                                    <option value="guide">Guide</option>
                                </select>
                            </div>

                        </div>

                        <div className="flex justify-end mt-5 gap-2">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="px-4 py-2 bg-slate-200 rounded-lg">
                                Hủy
                            </button>

                            <button

                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                                Lưu
                            </button>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}
