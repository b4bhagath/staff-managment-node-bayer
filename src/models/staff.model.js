const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    role: {
      type: String,
      required: true,
      enum: ['nurse', 'doctor', 'technician', 'admin'], // example roles
    },
    shiftPreferences: {
      type: [String], // e.g., ['morning', 'afternoon']
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

staffSchema.plugin(toJSON);
staffSchema.plugin(paginate);

staffSchema.statics.isEmailTaken = async function (email, excludeStaffId) {
  const staff = await this.findOne({ email, _id: { $ne: excludeStaffId } });
  return !!staff;
};

module.exports = mongoose.model('Staff', staffSchema);
