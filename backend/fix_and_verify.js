import mongoose from 'mongoose';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/merobhumi?appName=merobhumimongodb";

async function fixAndVerify() {
    try {
        await mongoose.connect(liveUri);
        console.log("Connected to merobhumi DB.");

        const User = mongoose.model('User', new mongoose.Schema({
            email: String,
            role: String,
            password: String
        }, { collection: 'users' }));

        const Property = mongoose.model('Property', new mongoose.Schema({
            title: String,
            status: String
        }, { collection: 'properties' }));

        // 1. Approve "butwal"
        const butwal = await Property.findOne({ title: { $regex: /butwal/i } });
        if (butwal) {
            butwal.status = 'approved';
            await butwal.save();
            console.log(`✅ Approved property: ${butwal.title} (ID: ${butwal._id})`);
        } else {
            console.log("Property 'butwal' not found.");
        }

        // 2. Check Admin User
        const admin = await User.findOne({ email: 'admin@merobhumi.com' });
        if (admin) {
            console.log("Admin User found in 'merobhumi' DB.");
            console.log(`Email: ${admin.email}`);
            console.log(`Role: ${admin.role}`);
        } else {
            console.log("Admin user NOT FOUND in 'merobhumi' DB.");
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

fixAndVerify();
