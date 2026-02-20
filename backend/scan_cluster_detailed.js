import mongoose from 'mongoose';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/?appName=merobhumimongodb";

async function scanClusterDetailed() {
    try {
        const client = await mongoose.connect(liveUri);
        console.log("Connected to MongoDB Cluster.");

        const adminDb = mongoose.connection.useDb('admin');
        const dbs = await adminDb.db.admin().listDatabases();

        console.log("\nDatabases in Cluster:");
        for (let dbInfo of dbs.databases) {
            console.log(`- ${dbInfo.name}`);
            const db = mongoose.connection.useDb(dbInfo.name);
            const collections = await db.db.listCollections().toArray();

            for (let coll of collections) {
                if (coll.name === 'properties' || coll.name === 'products') {
                    const count = await db.collection(coll.name).countDocuments();
                    const pendingCount = await db.collection(coll.name).countDocuments({ status: 'pending' });
                    const approvedCount = await db.collection(coll.name).countDocuments({ status: 'approved' });
                    console.log(`  -> ${coll.name} Count: ${count} (Pending: ${pendingCount}, Approved: ${approvedCount})`);
                }

                // Also check users for this db
                if (coll.name === 'users') {
                    const adminUser = await db.collection('users').findOne({ role: 'admin' });
                    console.log(`  -> Users Found. Admin exists: ${adminUser ? 'Yes (' + adminUser.email + ')' : 'No'}`);
                }
            }
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

scanClusterDetailed();
