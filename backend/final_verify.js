import mongoose from 'mongoose';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/merobhumi?appName=merobhumimongodb";

async function finalVerify() {
    try {
        await mongoose.connect(liveUri);
        const Property = mongoose.model('Property', new mongoose.Schema({ title: String, status: String }, { collection: 'properties' }));
        const User = mongoose.model('User', new mongoose.Schema({ email: String, role: String }, { collection: 'users' }));

        const butwal = await Property.findOne({ title: { $regex: /butwal/i } });
        console.log(`Final Check - Butwal Status: ${butwal ? butwal.status : 'NOT FOUND'}`);

        const admin = await User.findOne({ email: 'admin@merobhumi.com' });
        console.log(`Final Check - Admin Role: ${admin ? admin.role : 'NOT FOUND'}`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

finalVerify();
