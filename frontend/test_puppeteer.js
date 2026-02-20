import puppeteer from 'puppeteer';
import fs from 'fs';

async function verifyLiveSite() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    let errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });

    page.on('response', async response => {
        if (!response.ok() && response.request().resourceType() === 'image') {
            errors.push(`IMAGE FAIL (${response.status()}): ${response.url()}`);
        }
    });

    await page.goto('https://merobhumi-frontend.vercel.app/', { waitUntil: 'networkidle0', timeout: 30000 });

    // Scroll down to trigger lazy loading if needed
    await page.evaluate(async () => {
        window.scrollBy(0, window.innerHeight);
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.scrollBy(0, window.innerHeight);
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img'))
            .filter(img => !img.src.includes('svg') && !img.src.includes('favicon'))
            .map(img => ({
                src: img.src,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                complete: img.complete
            }));
    });

    fs.writeFileSync('page_analysis.json', JSON.stringify({
        errors,
        images
    }, null, 2));

    console.log("Analysis saved to page_analysis.json");
    await browser.close();
}

verifyLiveSite().catch(console.error);
