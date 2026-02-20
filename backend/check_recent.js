import mongoose from 'mongoose';
import Property from './models/propertymodel.js';
import User from './models/Usermodel.js';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/?appName=merobhumimongodb";

async function checkRecent() {
    try {
        await mongoose.connect(liveUri);
        console.log("Connected to live DB.");

        const users = await User.find({ name: { $regex: /kamal/i } });
        console.log(`Found ${users.length} users with "Kamal" in name.`);
        users.forEach(u => {
            console.log(`- ${u.name} (${u.email}) | Admin: ${u.role === 'admin'}`);
            console.log(`  ID: ${u._id}`);
        });

        // Let's also check all properties just in case
        const totalProperties = await Property.countDocuments();
        console.log(`Total properties in this DB: ${totalProperties}`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkRecent();
