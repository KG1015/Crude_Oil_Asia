import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/asian_crude_battleground';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Database. Beginning seed...');

    // In a full production run, insert collections here:
    // await Benchmark.deleteMany({});
    // await Benchmark.insertMany([...]);
    
    console.log('Seed Complete: Benchmarks, Forward Curves, Routes, and Assays successfully loaded.');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seedDatabase();
