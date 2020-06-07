import { Document, Model, model, Schema } from "mongoose";

// ------------------------- Interfaces -------------------------

namespace User {
  export interface SCHEMA extends Document {
    messenger_id: string;

    name?: {
      first?: string;
      last?: string;
    };

    birth_date?: Date;

    finished: boolean;
  }

  export type MODEL = Model<SCHEMA>
}

// ------------------------- Schema -------------------------

const SCHEMA = new Schema(
  {
    messenger_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      first: {
        type: String,
        minlength: 3,
      },
      last: {
        type: String,
        minlength: 3,
      },
    },
    birth_date: {
      type: Date,
    },
    finished: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

// ------------------------- Settings -------------------------

SCHEMA.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;
    delete ret.messenger_id;
    delete ret.finished;

    return ret;
  },
});

// ------------------------- Methods -------------------------

// ------------------------- Relations -------------------------

SCHEMA.virtual("messages", {
  ref: "Message",
  localField: "messenger_id",
  foreignField: "messenger_id",
  justOne: false,
});

// ------------------------- Plugins -------------------------

// ------------------------- Model -------------------------

const User = model<User.SCHEMA, User.MODEL>("User", SCHEMA);

export default User;
