import mongoose from 'mongoose';
import Property from './models/propertymodel.js';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/?appName=merobhumimongodb";

async function checkPending() {
    try {
        await mongoose.connect(liveUri);
        console.log("Connected to database.");

        const properties = await Property.find({ status: 'pending' }).sort({ createdAt: -1 });
        console.log(`Found ${properties.length} pending properties.`);

        if (properties.length > 0) {
            console.log("\nLast 3 Pending Properties:");
            const last3 = properties.slice(0, 3);
            last3.forEach(p => {
                console.log(`- Title: ${p.title}`);
                console.log(`  ID: ${p._id}`);
                console.log(`  Owner: ${p.owner}`);
                console.log(`  Images: ${p.image.length} count`);
                console.log(`  Image URLs:`, p.image);
            });
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkPending();
