const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User/User");
const AdminProfile = require("../model/User/AdminProfile");
const Partner = require("../model/User/partner");
const bookingSchema = require("../model/booking/bookingSchema");
const Staff = require("../model/User/Staff");
const Guide = require("../model/User/Guide");

const AdminController = {

    // ===== CREATE ADMIN =====
    createAdminProfile: async (req, res) => {
        try {
            const { email, username, password, role = "admin", fullName, phone, avatar } = req.body;

            const user = new User({ email, username, password, role });
            await user.save();

            const adminProfile = new AdminProfile({
                userId: user._id,
                fullName: fullName || "",
                phone: phone || "",
                avatar: avatar || "",
            });

            await adminProfile.save();

            res.status(201).json({ message: `${role} tạo thành công`, adminProfile });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== DELETE ADMIN =====
    deleteAdminProfile: async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "Không có email này" });

            await AdminProfile.findOneAndDelete({ userId: user._id });
            await User.findByIdAndDelete(user._id);

            res.status(200).json({ message: "Xóa Admin thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== CREATE PARTNER =====
    CreateDoiTac: async (req, res) => {
        try {
            const { email, username, password, role = "partner", fullName, phone, avatar, HopDong } = req.body;

            const user = new User({ email, username, password, role });
            await user.save();

            const partner = new Partner({
                userId: user._id,
                fullName,
                phone,
                avatar,
                HopDong
            });

            await partner.save();

            res.status(201).json({ message: `Phân quyền ${role} thành công`, partner });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== DELETE PARTNER =====
    RemovePartner: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) return res.status(404).json({ message: "Không có đối tác" });

            await Partner.findOneAndDelete({ userId: user._id });
            await User.findByIdAndDelete(user._id);

            res.status(200).json({ message: "Xóa đối tác thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== UPDATE PARTNER =====
    UpDatePartner: async (req, res) => {
        try {
            const { email, username, password, fullName, phone, avatar, HopDong } = req.body;

            const user = await User.findOneAndUpdate(
                { email },
                { username, password },
                { new: true }
            );

            if (!user) return res.status(404).json({ message: "Không có user" });

            const partner = await Partner.findOneAndUpdate(
                { userId: user._id },
                { fullName, phone, avatar, HopDong },
                { new: true }
            );

            res.status(200).json({ message: "Cập nhật thành công", user, partner });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== CREATE STAFF =====
    CreateNhanVien: async (req, res) => {
        try {
            const { email, username, password, role = "staff", FullName, Location, CCCD, Birthday } = req.body;

            const user = new User({ email, username, password, role });
            await user.save();

            const staff = new Staff({
                userId: user._id,
                FullName,
                Location,
                CCCD,
                Birthday
            });

            await staff.save();

            res.status(200).json({ message: "Thêm nhân viên thành công", staff });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== DELETE STAFF =====
    RemoveNhanVien: async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "Không có nhân viên" });

            await Staff.findOneAndDelete({ userId: user._id });
            await User.findByIdAndDelete(user._id);

            res.status(200).json({ message: "Xóa nhân viên thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== UPDATE STAFF =====
    UpDateNhanVien: async (req, res) => {
        try {
            const { email, username, password, role, FullName, Location, CCCD, Birthday } = req.body;

            const user = await User.findOneAndUpdate(
                { email },
                { username, password, role },
                { new: true }
            );

            if (!user) return res.status(404).json({ message: "Không có user" });

            const staff = await Staff.findOneAndUpdate(
                { userId: user._id },
                { FullName, Location, CCCD, Birthday },
                { new: true }
            );

            res.status(200).json({ message: "Cập nhật thành công", user, staff });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== GET ALL STAFF =====
    getAllStaff: async (req, res) => {
        try {
            const staff = await Staff.find();
            res.status(200).json({ message: "OK", staff });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== GET ALL PARTNER =====
    getAllPartner: async (req, res) => {
        try {
            const partner = await Partner.find();
            res.status(200).json({ message: "OK", partner });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ===== GET ALL BOOKING =====
    GetAllBoking: async (req, res) => {
        try {
            const booking = await bookingSchema.find();
            res.status(200).json({ message: "Tất cả booking", booking });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // ===== GET ALL USER (ADMIN / STAFF / GUIDE) =====
    getAllUser: async (req, res) => {
        try {
            const users = await User.find({
                role: { $in: ["admin", "staff", "guide"] }
            }).select("-password");

            res.status(200).json({ message: "Tất cả user", users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    RmUser: async (req, res) => {
        try {
            const { id } = req.body;

            if (!id) return res.status(400).json({ message: "Thiếu id user" });

            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: "User không tồn tại" });

            // Xoá profile theo role
            if (user.role === "staff")
                await Staff.findOneAndDelete({ userId: user._id });

            if (user.role === "admin")
                await AdminProfile.findOneAndDelete({ userId: user._id });

            if (user.role === "guide")
                await Guide.findOneAndDelete({ userId: user._id });

            // Xoá user
            await User.findByIdAndDelete(user._id);

            res.status(200).json({ message: "Xoá user thành công" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

};

module.exports = AdminController;
