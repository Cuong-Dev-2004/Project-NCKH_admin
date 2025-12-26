import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../../auth/HandleToken";
import TableInput from "../../component/TableHandleInput";

function ManagerTours() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [filterLocation, setFilterLocation] = useState("");

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        name: "",
        locationText: "",
        location: "",
        price: "",
        oldPrice: "",
        capacity: "",
        duration: "",
        minAge: "13+",
        pickup: "",
        images: [],
        data1: [],
    });


    const API = "http://localhost:3000/api/staff";

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await axios.get(`${API}/GetAllProdcutTour`);
            setData(res.data.products || []);
        } catch (err) {
            console.log(err);
            setError("Không thể tải dữ liệu");
        }
        setLoading(false);
    };

    // mở modal thêm
    const openAdd = () => {
        setEditMode(false);
        setForm({
            name: "",
            locationText: "",
            location: "",
            price: "",
            oldPrice: "",
            capacity: "",
            duration: "",
            minAge: "13+",
            pickup: "",
            images: [],
            data1: [],
        });
        setShowModal(true);
    };



    const openEdit = (tour) => {
        setEditMode(true);
        setForm({
            id: tour._id,
            name: tour.name,
            locationText: tour.locationText || "",
            location: tour.location || "",
            price: tour.price,
            oldPrice: tour.oldPrice,
            duration: tour.duration,
            capacity: tour.capacity,
            minAge: tour.minAge,
            pickup: tour.pickup,
            images: Array.isArray(tour.images) ? tour.images : [tour.images || ""],
            data1: Array.isArray(tour.data1) ? tour.data1 : [tour.data1 || ""],
        });
        setShowModal(true);
    };



    const remove = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xoá?")) return;

        try {
            const token = getToken();

            await axios.delete(`${API}/RmProdcutTour/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setData(prev => prev.filter(item => item._id !== id));

            alert("Xoá thành công");
        } catch (err) {
            console.error(err);
            alert("Xoá thất bại");
        }
    };



    const locations = [...new Set(
        data
            .map(i => i.location?.trim())
            .filter(Boolean)
            .map(l => l.toLowerCase())
    )];


    const filtered = data.filter(item => {
        const matchName = item.name?.toLowerCase().includes(search.toLowerCase());
        const matchLocation = filterLocation ? item.location?.toLowerCase() === filterLocation : true;
        return matchName && matchLocation;
    });
    {
        console.log(form)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            const token = getToken();

            if (!editMode) {
                await axios.post(`http://localhost:3000/api/staff/CreateProductTour`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Thêm thành công");
            } else {
                await axios.put(`http://localhost:3000/api/staff/UpdateProdcutTour/${form.id}/edit`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Cập nhật thành công");
            }

            setShowModal(false);
            loadData();

        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra");
        }
    };


    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Quản lý Tour</h1>

                <button
                    onClick={openAdd}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Thêm tour
                </button>
            </div>

            <div className="flex gap-4 mb-4">
                <input
                    className="border px-3 py-2 rounded w-1/2"
                    placeholder="Tìm kiếm tour…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <select
                    className="border px-3 py-2 rounded"
                    value={filterLocation}
                    onChange={e => setFilterLocation(e.target.value)}
                >
                    <option value="">Tất cả địa điểm</option>
                    {locations.map(l => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Đang tải…</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && (
                <table className="w-full bg-white shadow">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Ảnh</th>
                            <th className="p-2">Tên</th>
                            <th className="p-2">Địa điểm</th>
                            <th className="p-2">Giá</th>
                            <th className="p-2">Thời lượng</th>
                            <th className="p-2">Tuổi</th>
                            <th className="p-2">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map(t => (
                            <tr key={t._id} className="border-t">
                                <td className="p-2">
                                    <img src={t.images?.[0]} className="w-20 h-14 object-cover rounded" />
                                </td>
                                <td className="p-2">{t.name}</td>
                                <td className="p-2">{t.location || "—"}</td>
                                <td className="p-2 text-green-600 font-bold">{t.price?.toLocaleString()} đ</td>
                                <td className="p-2">{t.duration}</td>
                                <td className="p-2">{t.minAge}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => openEdit(t)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => remove(t._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
                                    Không có tour phù hợp
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* MODAL */}
            {showModal && <TableInput
                show={showModal}
                editMode={editMode}
                form={form}
                setForm={setForm}
                setShowModal={setShowModal}
                handleSubmit={handleSubmit}
            />}

        </div>
    );
}

export default ManagerTours;
