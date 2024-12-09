import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increased timeout to 30 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      // UseUnifiedTopology: true, // Enable for improved connection stability
      // useCreateIndex: true, // Deprecated in Mongoose 6
      // useFindAndModify: false, // Deprecated in Mongoose 6
    });

    // Set default operation timeout at the global level
    mongoose.set("bufferTimeoutMS", 30000);

    console.log(
      `✅ MongoDB connected! DB: ${connectionInstance.connection.name}`,
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;