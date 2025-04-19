import mongoose from 'mongoose';

interface Options {
  mongoURL: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoURL, dbName } = options;

    try { 
      mongoose.connect(mongoURL, {
        dbName: dbName,
      })

      console.log("MongoDB connected successfully");
      return true;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}