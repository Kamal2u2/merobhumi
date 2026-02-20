import mongoose from 'mongoose';
import Property from './models/propertymodel.js';
import User from './models/Usermodel.js';
import dotenv from 'dotenv';
dotenv.config();

const checkOwnerListings = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/merobhumi');
        console.log('Connected to MongoDB');

        const regularUsers = await User.find({ role: 'user' }).select('_id name');
        const userIds = regularUsers.map(u => u._id);
        console.log(`Found ${regularUsers.length} regular users`);

        const ownerListings = await Property.find({
            owner: { $in: userIds },
            status: 'approved'
        });

        console.log(`Found ${ownerListings.length} approved owner listings`);
        ownerListings.forEach(p => {
            console.log(`- ${p.title} (Owner: ${p.owner})`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkOwnerListings();
