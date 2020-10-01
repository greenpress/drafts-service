import mongoose, { Document } from "mongoose";

export interface IDraft extends Document {
  user: string;
  tenant: string;
  contectType: string;
  contextId: string | undefined;
  contextData: any;
}

const DraftSchema = new mongoose.Schema<IDraft>({
  user: {
    type: String,
    required: true,
  },
  tenant: {
    type: String,
    required: true,
  },
  contextType: {
    type: String,
    required: true,
  },
  contextId: {
    type: String,
    required: false,
  },
  contextData: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

export default mongoose.model<IDraft>("Draft", DraftSchema);
