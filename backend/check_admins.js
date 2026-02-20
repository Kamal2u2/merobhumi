import mongoose from 'mongoose';
import User from './models/Usermodel.js';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/?appName=merobhumimongodb";

async function checkAdmins() {
    try {
        await mongoose.connect(liveUri);
        console.log("Connected to live DB.");

        const allUsers = await User.find({});
        console.log(`Total users in DB: ${allUsers.length}`);

        const admins = await User.find({ role: 'admin' });
        console.log(`Total admins in DB: ${admins.length}`);

        if (admins.length > 0) {
            console.log("\nAdmin Accounts:");
            admins.forEach(a => {
                console.log(`- ${a.name} (${a.email})`);
            });
        } else {
            console.log("WARNING: NO ADMIN ACCOUNTS FOUND!");
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkAdmins();
