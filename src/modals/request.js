const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "Invalid Status {VALUE} ",
      },
    },
  },
  { timestamps: true }
);
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const toSaveobj = this;
  if (toSaveobj.fromUserId.equals(toSaveobj.toUserId)) {
    throw new Error("from and to user Id cannot be same");
  }
  next();
});
const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
