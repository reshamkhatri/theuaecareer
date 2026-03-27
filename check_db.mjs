import mongoose from 'mongoose';

async function check() {
  try {
    await mongoose.connect('mongodb://localhost:27017/theuaecareer');
    const articles = await mongoose.connection.db.collection('articles').countDocuments();
    const jobs = await mongoose.connection.db.collection('jobs').countDocuments();
    console.log(`Articles: ${articles}`);
    console.log(`Jobs: ${jobs}`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

check();
