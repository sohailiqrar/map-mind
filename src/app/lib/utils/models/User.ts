import mongoose from "mongoose";

const journalPageSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  journalPages: {
    type: [journalPageSchema],
    default: []
  },
  trackerData: {
    type: [[String, Number]],
    default: [
      ["Date", "Mood"],
      ["-", 0],
      ["-", 0],
      ["-", 0],
      ["-", 0],
      ["-", 0],
      ["-", 0],
      ["-", 0]
    ]
  }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
