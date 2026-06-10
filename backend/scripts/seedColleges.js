const connectDB = require('../config/db');
const importCollegeData = require('../utils/importCollegeData');

(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB, importing colleges.json...');
    await importCollegeData();
    console.log('Import complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
})();
