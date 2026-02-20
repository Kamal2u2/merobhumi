import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

const api = axios.create({
    baseURL: 'https://merobhumi.onrender.com/api'
});

async function testUploadProcess() {
    try {
        console.log("1. Creating dummy test image (1x1 transparent PNG)");
        const pngBuffer = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==", 'base64');
        const imgPath = path.join(process.cwd(), 'dummy_upload.png');
        fs.writeFileSync(imgPath, pngBuffer);

        console.log("2. Registering QA Test User...");
        const registerRes = await api.post('/users/register', {
            name: "QA Upload Tester",
            email: "qa_upload_" + Date.now() + "@example.com",
            phone: "9800000000",
            password: "password123"
        });

        const token = registerRes.data.token;
        const authHeader = { Authorization: `Bearer ${token}` };

        console.log("3. Getting a plan and subscribing...");
        const planRes = await api.get('/plans/all');
        const planId = planRes.data.plans[0]._id;

        await api.post('/plans/subscribe', { planId }, { headers: authHeader });
        console.log("Subscribed successfully.");

        console.log("4. Uploading property simulating a standard user...");

        const form = new FormData();
        form.append('title', 'QA Test Upload Property');
        form.append('type', 'House');
        form.append('availability', 'sale');
        form.append('price', '15000000');
        form.append('location', 'QA Test Location, Kathmandu');
        form.append('description', 'This is a test upload.');
        form.append('beds', '3');
        form.append('baths', '2');
        form.append('sqft', '1500');
        form.append('phone', '9800000000');
        form.append('image1', fs.createReadStream(imgPath));

        const uploadRes = await api.post('/products/add', form, {
            headers: {
                ...form.getHeaders(),
                ...authHeader
            }
        });

        console.log("Upload Response:", uploadRes.data);

        console.log("5. Checking Admin List behavior (Simulating Admin)...");
        const adminRes = await api.post('/users/login', {
            email: "admin@merobhumi.com",
            password: "password123"
        });
        const adminToken = adminRes.data.token;

        const pendingRes = await api.get('/products/list?status=pending', {
            headers: { Authorization: `Bearer ${adminToken}` }
        });

        const pendingProperties = pendingRes.data.property;
        console.log(`Found ${pendingProperties.length} pending properties in Admin API view.`);
        if (pendingProperties.length > 0) {
            console.log("Latest Pending Property Images:", pendingProperties[0].image);
            console.log("As expected, if ImageKit keys are missing on Render, it fell back to a dummy URL.");

            // Clean up by removing the test property
            for (let prop of pendingProperties) {
                if (prop.title === 'QA Test Upload Property') {
                    console.log("Cleaning up test property...");
                    await api.post('/products/remove', { id: prop._id }, {
                        headers: { Authorization: `Bearer ${adminToken}` }
                    });
                }
            }
        }

        fs.unlinkSync(imgPath);
    } catch (err) {
        if (err.response) {
            console.error("API ERROR:", err.response.status, err.response.data);
        } else {
            console.error("ERROR:", err.message);
        }
    }
}

testUploadProcess();
