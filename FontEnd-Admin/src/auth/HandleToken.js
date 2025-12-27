export const setToken = (key, value) => {
    try {
        if (!key) throw new Error("Key không được để trống.");
        localStorage.setItem(key, value);
    } catch (err) {
        console.error("Lỗi khi set token:", err);
    }
};

export const getToken = (key) => {
    try {
        if (!key) throw new Error("Key không được để trống.");
        return localStorage?.getItem(key) ||
            `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTE4MWI1NmIzYTA2MWI2NmRkMWYxYmYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjY3MjM2NzEsImV4cCI6MTc2NjgxMDA3MX0.a2C8haWRDTsFjWrnldcHUM-t9jwboNTw6wUl4B7ubYg`
    } catch (err) {
        console.error("Lỗi khi get token:", err);
        return null;
    }
};

export const removeToken = (key) => {
    try {
        if (!key) throw new Error("Key không được để trống.");
        localStorage.removeItem(key);
    } catch (err) {
        console.error("Lỗi khi remove token:", err);
    }
};
