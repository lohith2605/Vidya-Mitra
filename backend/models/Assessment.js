const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  userId: {
    type: String, // String to support both MongoDB ObjectId and 'temp-bypass-id'
    required: true
  },
  username: {
    type: String,
    required: true
  },
  educationLevel: {
    type: String,
    required: true,
    enum: ["10th Pass", "Inter MPC", "Inter BiPC", "Degree Student"]
  },
  answers: [
    {
      questionId: {
        type: String,
        required: true
      },
      questionText: {
        type: String,
        required: true
      },
      answerText: {
        type: String,
        required: true
      }
    }
  ],
  recommendations: [
    {
      careerId: {
        type: String,
        required: true
      },
      matchScore: {
        type: Number,
        required: true
      },
      reasons: {
        type: [String],
        default: []
      }
    }
  ],
  completedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Assessment", AssessmentSchema);
