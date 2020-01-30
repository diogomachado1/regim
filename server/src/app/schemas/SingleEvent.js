import mongoose from 'mongoose';

const SingleEventSchema = new mongoose.Schema({
  eventStartDate: {
    type: Date,
    required: true,
  },
  eventId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('SingleEvent', SingleEventSchema);
