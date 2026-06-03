const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["10th Pass", "Inter MPC", "Inter BiPC", "Degree Student"]
  },
  questionText: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    required: true,
    enum: ["choice", "text"]
  },
  options: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Question", QuestionSchema);
