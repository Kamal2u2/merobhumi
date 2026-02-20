import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    console.log("Navigating to https://merobhumi-frontend.vercel.app/ ...");

    // Listen for all network requests
    page.on('request', request => {
        if (request.url().includes('/api/')) {
            console.log('API Request detected:', request.url());
        }
    });

    try {
        await page.goto('https://merobhumi-frontend.vercel.app/', { waitUntil: 'networkidle2' });

        // Check for common env vars in window/html if any
        const apiUrlFromDOM = await page.evaluate(() => {
            // Check if any script contains the string 'http' and 'api'
            return Array.from(document.querySelectorAll('script'))
                .map(s => s.textContent || s.src)
                .filter(t => t.includes('/api/'))[0] || "Not found in DOM";
        });

        console.log("Potential API URL in DOM:", apiUrlFromDOM);

    } catch (e) {
        console.error("Navigation error:", e.message);
    }

    await browser.close();
})();
