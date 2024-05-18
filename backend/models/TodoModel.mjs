import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Item", TodoSchema);
