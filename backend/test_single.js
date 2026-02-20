import https from 'https';

const newApiUrl = 'https://merobhumi.onrender.com/api/products/single/69989f2fe4907b4d77b80517';

https.get(newApiUrl, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("IMAGE ARRAY:", json.property.image);
            console.log("TITLE:", json.property.title);
        } catch (e) {
            console.error("Failed to parse response.");
            console.error("Raw response snippet:", data.substring(0, 200));
        }
    });
}).on("error", (err) => {
    console.log("Error fetching API: " + err.message);
});
