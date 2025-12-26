import React from "react";

function TableInput({ show, editMode, form, setForm, setShowModal, handleSubmit }) {

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center p-3 ml">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[95vh] overflow-y-auto animate-fadeIn border border-gray-100"
            >
                {/* HEADER */}
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        {editMode ? "Sửa Tour" : " Thêm Tour"}
                    </h2>

                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 hover:text-black text-xl"
                    >
                        ✖
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-5 space-y-6">

                    {/* SECTION: GENERAL */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">
                            📌 Thông tin chung
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Tên tour</label>
                                <input
                                    className="input-ui"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">Location Text</label>
                                <input
                                    className="input-ui"
                                    value={form.locationText}
                                    onChange={e => setForm({ ...form, locationText: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">Địa điểm</label>
                                <input
                                    className="input-ui"
                                    value={form.location}
                                    onChange={e => setForm({ ...form, location: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">Thời lượng</label>
                                <input
                                    className="input-ui"
                                    value={form.duration}
                                    onChange={e => setForm({ ...form, duration: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION: PRICE */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">
                            Giá tour
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="label">Giá</label>
                                <input
                                    type="number"
                                    className="input-ui"
                                    value={form.price}
                                    onChange={e => setForm({ ...form, price: e.target.value })}
                                    required
                                    min={0}
                                />
                            </div>

                            <div>
                                <label className="label">Giá cũ</label>
                                <input
                                    type="number"
                                    className="input-ui"
                                    value={form.oldPrice}
                                    onChange={e => setForm({ ...form, oldPrice: e.target.value })}
                                    min={0}
                                />
                            </div>

                        </div>
                    </div>

                    {/* SECTION: CONDITIONS */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">
                            👥 Điều kiện
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="label">Số người tối đa</label>
                                <input
                                    className="input-ui"
                                    value={form.capacity}
                                    onChange={e => setForm({ ...form, capacity: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">Tuổi tối thiểu</label>
                                <input
                                    className="input-ui"
                                    value={form.minAge}
                                    onChange={e => setForm({ ...form, minAge: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION: NOTES */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">
                            Khác
                        </h3>

                        <div className="space-y-4">

                            <div>
                                <label className="label">Điểm đón khách</label>
                                <input
                                    className="input-ui"
                                    value={form.pickup}
                                    onChange={e => setForm({ ...form, pickup: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">Ảnh (mỗi dòng 1 link)</label>
                                <textarea
                                    rows={3}
                                    className="input-ui w-full min-h-50"
                                    value={(form.images || []).join("\n")}
                                    onChange={e =>
                                        setForm({ ...form, images: e.target.value.split("\n") })
                                    }
                                />
                            </div>

                            <div>
                                <label className="label">Data1 (mỗi dòng 1 mục)</label>
                                <textarea
                                    rows={3}
                                    className="input-ui w-500"
                                    value={(form.data1 || []).join("\n")}
                                    onChange={e =>
                                        setForm({ ...form, data1: e.target.value.split("\n") })
                                    }
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100"
                    >
                        Huỷ
                    </button>

                    <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TableInput;
