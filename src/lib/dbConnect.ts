import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI!, {
            dbName: 'Xavio'
        });
        connection.isConnected = db.connections[0].readyState;
        console.log(db.connection.db.databaseName); // Corrected log statement
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

export default dbConnect;