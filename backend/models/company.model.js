import mongoose from 'mongoose';
const companySchema = new mongoose.Schema({
  name: {   
    type: String,
    required: true,
    unique: true,
  },
  description: {   
    type: String,
    required: true,
  },
   website: {   
    type: String,
    required: true,
  },
   location: {   
    type: String,
   
  },
   logo: {   
    type: String,
  },
   userId: {   
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
},{timestamps: true});
export const Company = mongoose.model('Company', companySchema);