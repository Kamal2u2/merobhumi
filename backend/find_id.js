import mongoose from 'mongoose';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/merobhumi?appName=merobhumimongodb";

async function findId() {
    try {
        await mongoose.connect(liveUri);
        const Property = mongoose.model('Property', new mongoose.Schema({ title: String, status: String }, { collection: 'properties' }));

        const prop = await Property.findById("69989f2fe4907b4d77b80518");
        if (prop) {
            console.log("Found ID 69989f2fe4907b4d77b80518 in 'merobhumi' DB.");
            console.log(`Title: ${prop.title}, Status: ${prop.status}`);
        } else {
            console.log("ID 69989f2fe4907b4d77b80518 NOT FOUND in 'merobhumi' DB.");
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

findId();
