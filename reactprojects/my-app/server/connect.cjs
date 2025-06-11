const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
    const Db = process.env.ATLAS_URI;
    if (!Db) {
        console.error("MongoDB connection string is missing from environment variables.");
        return;
    }

    const client = new MongoClient(Db, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const collections = await client.db("ToDoApp").listCollections().toArray();
        if (collections.length === 0) {
            console.log("No collections found in the database.");
        } else {
            collections.forEach((collection) => console.log(collection.name));
        }
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

main();
