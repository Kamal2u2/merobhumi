import mongoose from 'mongoose';

// Define schemas to avoid "MissingSchemaError"
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String
}, { collection: 'users' });

const propertySchema = new mongoose.Schema({
    title: String,
    status: String
}, { collection: 'products' });

const User = mongoose.model('User', userSchema);
const Property = mongoose.model('Property', propertySchema);

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/?appName=merobhumimongodb";

async function verifyLiveDb() {
    try {
        await mongoose.connect(liveUri);
        console.log("Connected to live DB.");

        // 1. Check Admin User
        const adminEmail = 'admin@merobhumi.com';
        const adminUser = await User.findOne({ email: adminEmail });

        if (adminUser) {
            console.log(`Admin User Found: ${adminUser.email}`);
            console.log(`Current Role: ${adminUser.role}`);

            if (adminUser.role !== 'admin') {
                adminUser.role = 'admin';
                await adminUser.save();
                console.log("-> Updated role to 'admin'");
            }
        } else {
            console.log(`Admin User NOT FOUND: ${adminEmail}`);
        }

        // 2. Check "butwal" property
        const butwal = await Property.findOne({ title: { $regex: /butwal/i } });
        if (butwal) {
            console.log(`'butwal' property found! Status: ${butwal.status}`);
        } else {
            console.log("'butwal' property NOT FOUND in DB.");
        }

        // 3. Count total pending
        const pendingCount = await Property.countDocuments({ status: 'pending' });
        console.log(`Total Pending Properties: ${pendingCount}`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

verifyLiveDb();
