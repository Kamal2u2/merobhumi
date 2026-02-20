import axios from 'axios';

const api = axios.create({
    baseURL: 'https://merobhumi.onrender.com/api'
});

async function findButwal() {
    try {
        console.log("Searching for 'butwal' property on live API...");
        const adminLogin = await api.post('/users/login', {
            email: "admin@merobhumi.com",
            password: "password123"
        });
        const adminToken = adminLogin.data.token;

        // Fetch ALL statuses as admin
        const allRes = await api.get('/products/list?status=all', {
            headers: { Authorization: `Bearer ${adminToken}` }
        });

        console.log(`Total properties found on API: ${allRes.data.property.length}`);

        const butwal = allRes.data.property.find(p => p.title.toLowerCase().includes('butwal'));
        if (butwal) {
            console.log("Success! Found 'butwal' property on API:");
            console.log(JSON.stringify(butwal, null, 2));
        } else {
            console.log("'butwal' property NOT FOUND on API.");
            console.log("Checking the last 3 properties uploaded:");
            allRes.data.property.slice(0, 3).forEach(p => console.log(`- ${p.title} (Status: ${p.status}, CreatedAt: ${p.createdAt})`));
        }

    } catch (err) {
        console.error(err.message);
    }
}

findButwal();
