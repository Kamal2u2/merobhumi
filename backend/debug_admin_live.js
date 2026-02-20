import axios from 'axios';

const api = axios.create({
    baseURL: 'https://merobhumi.onrender.com/api'
});

async function debugAdmin() {
    try {
        console.log("Logging in as Admin...");
        const adminLogin = await api.post('/users/login', {
            email: "admin@merobhumi.com",
            password: "password123"
        });

        console.log("Login User Data:", adminLogin.data.user);
        const adminToken = adminLogin.data.token;
        const config = { headers: { Authorization: `Bearer ${adminToken}` } };

        console.log("\nChecking Admin Stats (requires admin role)...");
        const statsRes = await api.get('/admin/stats', config);
        console.log("Stats Success:", statsRes.data.success);
        console.log("Pending Properties Count in Stats:", statsRes.data.stats.pendingProperties);

        console.log("\nAttempting to approve one property (ID: 69989f2fe4907b4d77b80518)...");
        try {
            const res = await api.put('/admin/properties/status', {
                propertyId: "69989f2fe4907b4d77b80518",
                status: 'approved'
            }, config);
            console.log("Approval result:", res.data);
        } catch (e) {
            console.error("Single Approval Failed:", e.response?.status, e.response?.data);
        }

    } catch (err) {
        if (err.response) {
            console.error("API ERROR:", err.response.status, err.response.data);
        } else {
            console.error("ERROR:", err.message);
        }
    }
}

debugAdmin();
