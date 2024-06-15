const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    default: "",
  },
  imageUrl1: {
    type: String,
    default: "",
  },
  videoUrl: {
    type: String,
    default: "",
  },
  seen: {
    type: Boolean,
    default: false,
  },
});

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("conversation", conversationSchema);
const messageModel = mongoose.model("message", messageSchema);

module.exports = { conversationModel, messageModel };
