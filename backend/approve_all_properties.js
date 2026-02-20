import axios from 'axios';

const api = axios.create({
    baseURL: 'https://merobhumi.onrender.com/api'
});

async function approveAll() {
    try {
        console.log("Logging in as Admin...");
        const adminLogin = await api.post('/users/login', {
            email: "admin@merobhumi.com",
            password: "password123"
        });
        const adminToken = adminLogin.data.token;
        const config = { headers: { Authorization: `Bearer ${adminToken}` } };

        console.log("Fetching pending properties...");
        const pendingRes = await api.get('/products/list?status=pending', config);
        const pendingList = pendingRes.data.property;
        console.log(`Found ${pendingList.length} pending properties.`);

        if (pendingList.length === 0) {
            console.log("Nothing to approve.");
            return;
        }

        console.log("Approving all properties...");
        for (const prop of pendingList) {
            console.log(`Approving: ${prop.title}`);
            await api.put('/admin/properties/status', {
                propertyId: prop._id,
                status: 'approved'
            }, config);
        }

        console.log("✅ All properties approved successfully!");

    } catch (err) {
        if (err.response) {
            console.error("API ERROR:", err.response.status, err.response.data);
        } else {
            console.error("ERROR:", err.message);
        }
    }
}

approveAll();
