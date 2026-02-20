import mongoose from 'mongoose';

const liveUri = "mongodb+srv://xfinitykamal_db_user:DmwfnqaCQDbjrAHV@merobhumimongodb.uxowmhw.mongodb.net/?appName=merobhumimongodb";

async function scanCluster() {
    try {
        const client = await mongoose.connect(liveUri);
        console.log("Connected to MongoDB Cluster.");

        const adminDb = mongoose.connection.useDb('admin');
        const dbs = await adminDb.db.admin().listDatabases();

        console.log("\nDatabases in Cluster:");
        for (let dbInfo of dbs.databases) {
            console.log(`- ${dbInfo.name} (${dbInfo.sizeOnDisk} bytes)`);
            const db = mongoose.connection.useDb(dbInfo.name);
            const collections = await db.db.listCollections().toArray();
            console.log(`  Collections: ${collections.map(c => c.name).join(', ')}`);

            // Check counts in 'products' if it exists
            if (collections.some(c => c.name === 'products')) {
                const count = await db.collection('products').countDocuments();
                const pendingCount = await db.collection('products').countDocuments({ status: 'pending' });
                console.log(`  -> Products Count: ${count} (Pending: ${pendingCount})`);
            }
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

scanCluster();
