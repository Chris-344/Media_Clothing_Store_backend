
import { connect, disconnect } from 'mongoose';
import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const client = new MongoClient(process.env.DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export const connectDB = async () =>
{
    try
    {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await connect(process.env.DB_URL, clientOptions);
        await client.db('media_clothing_store')
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally
    {
        // Ensures that the client will close when you finish/error
        await disconnect();
    }
}
connectDB().catch(console.dir);
