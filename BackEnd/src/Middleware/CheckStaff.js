const CheckStaff = (req, res, next) => {
    if (!req.user || !["staff", "admin"].includes(req.user.role)) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }
    next();
};


module.exports = CheckStaff;
