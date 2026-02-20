import mongoose from 'mongoose';
import Property from './models/propertymodel.js';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/?appName=merobhumimongodb";

async function approveEverything() {
    try {
        await mongoose.connect(liveUri);
        console.log("Connected to live DB.");

        const res = await Property.updateMany(
            { status: { $ne: 'approved' } },
            { $set: { status: 'approved' } }
        );

        console.log(`✅ Approved ${res.modifiedCount} properties.`);

        // Also ensure the admin user has the admin role
        // I'll check admin@merobhumi.com
        const User = mongoose.model('User');
        const admin = await User.findOne({ email: 'admin@merobhumi.com' });
        if (admin && admin.role !== 'admin') {
            admin.role = 'admin';
            await admin.save();
            console.log("✅ Fixed admin user role.");
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

approveEverything();
