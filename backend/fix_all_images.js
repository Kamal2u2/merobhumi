import mongoose from 'mongoose';
import Property from './models/propertymodel.js';
import https from 'https';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/?appName=merobhumimongodb";

const propertyImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1628191010210-a59de33e5941?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600573472592-401b489a59cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585152220-90363ae7e11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d629f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
];

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', () => {
            resolve({ url, status: 500 });
        });
    });
};

const getRandomMultiple = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

async function fixAllImages() {
    try {
        console.log("Validating all Unsplash URLs...");
        const validUrls = [];

        for (const url of propertyImages) {
            const result = await checkUrl(url);
            if (result.status === 200 || result.status === 302 || result.status === 301) {
                validUrls.push(url);
            } else {
                console.log(`❌ 404 Deleted Unsplash: ${url.split('photo-')[1].split('?')[0]}`);
            }
        }

        console.log(`\nFound ${validUrls.length} fully working images out of ${propertyImages.length}.`);
        if (validUrls.length === 0) {
            console.error("CRITICAL: NO VALID IMAGES FOUND.");
            process.exit(1);
        }

        console.log("\nConnecting to live database...");
        await mongoose.connect(liveUri);

        const properties = await Property.find();
        console.log(`Found ${properties.length} total properties.`);

        let fixedCount = 0;

        for (let p of properties) {
            // Unconditionally overwrite EVERY property's images with only the strictly validated ones
            p.image = getRandomMultiple(validUrls, 3);
            await p.save();
            fixedCount++;
        }

        console.log(`\n✅ Successfully re-linked ${fixedCount} properties with guaranteed valid images!`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

fixAllImages();
