const mongoose = require('mongoose');
const config = require('../src/config/config');
const { Admin } = require('../src/models');

const createAdmin = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    console.log('Connected to MongoDB');

    const existingAdmin = await Admin.findOne({ username: 'bayer' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const admin = new Admin({
      username: 'bayer',
      password: 'bayerbanngalore@123',
      name: 'Admin Bayer',
    });

    await admin.save();
    console.log('Admin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
