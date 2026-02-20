import axios from 'axios';

const api = axios.create({
    baseURL: 'https://merobhumi.onrender.com/api'
});

async function testAuthFlow() {
    try {
        console.log("1. Registering test user...");
        const registerRes = await api.post('/users/register', {
            name: "QA Test User",
            email: "qa_test_" + Date.now() + "@example.com",
            phone: "9800000000",
            password: "password123"
        });

        console.log("Register response:", registerRes.data);
        const token = registerRes.data.token;

        if (!token) {
            console.error("No token received!");
            return;
        }

        console.log("2. Fetching plans to get a plan ID...");
        const planRes = await api.get('/plans/all');
        const planId = planRes.data.plans[0]._id;
        console.log("Using plan ID:", planId);

        console.log("3. Subscribing to plan with token...");
        const subRes = await api.post('/plans/subscribe', { planId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Subscribe response:", subRes.data);
        console.log("ALL SUCCESS!");

    } catch (err) {
        if (err.response) {
            console.error("API ERROR:", err.response.status, err.response.data);
        } else {
            console.error("NETWORK ERROR:", err.message);
        }
    }
}

testAuthFlow();
