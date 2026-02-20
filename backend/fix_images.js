import mongoose from 'mongoose';
import Property from './models/propertymodel.js';

// No DB specified here so it matches the Vercel/Render current configuration (which went to the default DB)
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

const getRandomMultiple = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

// Known broken/deleted Unsplash Photo IDs
const badRegex = /1580587771525|1600607687946/;

async function fixImages() {
    try {
        await mongoose.connect(liveUri);
        console.log("Connected to live DB (default DB).");

        const properties = await Property.find();
        console.log(`Found ${properties.length} total properties.`);

        let fixedCount = 0;

        for (let p of properties) {
            let needsFix = false;

            // Missing entirely
            if (!p.image || Object.keys(p.image).length === 0 || p.image.length === 0) {
                needsFix = true;
            } else {
                // Check if any bad URL is inside the array
                const hasBad = p.image.some(img => typeof img !== 'string' || badRegex.test(img) || img === '');
                if (hasBad) needsFix = true;
            }

            if (needsFix) {
                console.log(`Fixing property: ${p.title} (ID: ${p._id})`);
                p.image = getRandomMultiple(propertyImages, 3);
                await p.save();
                fixedCount++;
            }
        }

        console.log(`----------------------------------`);
        console.log(`Successfully fixed images for ${fixedCount} broken properties!`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
fixImages();
