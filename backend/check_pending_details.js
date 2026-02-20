import mongoose from 'mongoose';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/merobhumi?appName=merobhumimongodb";

async function checkPendingDetails() {
    try {
        await mongoose.connect(liveUri);
        console.log("Connected to merobhumi DB.");

        const Property = mongoose.model('Property', new mongoose.Schema({
            title: String,
            status: String,
            owner: mongoose.Schema.Types.ObjectId
        }, { collection: 'properties' }));

        const pending = await Property.find({ status: 'pending' });
        console.log(`Found ${pending.length} pending properties:`);
        pending.forEach(p => {
            console.log(`- Title: ${p.title} (ID: ${p._id})`);
        });

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkPendingDetails();
