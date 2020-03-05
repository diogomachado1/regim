import { Schema, model } from 'mongoose';

const SingleEventSchema = new Schema({
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

export default model('SingleEvent', SingleEventSchema);
