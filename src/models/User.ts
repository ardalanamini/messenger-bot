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

/**
 * @swagger
 *
 * definitions:
 *
 *   User:
 *     allOf:
 *       - $ref: "#/definitions/DBItem"
 *       - type: object
 *         required:
 *           - messenger_id
 *         properties:
 *           messenger_id:
 *             type: string
 *             example: "1234567890"
 *           name:
 *             type: object
 *             properties:
 *               first:
 *                 type: string
 *                 example: "Ardalan"
 *               last:
 *                 type: string
 *                 example: "Amini"
 *           birth_date:
 *             type: string
 *             format: date-time
 *
 * parameters:
 *
 *   user_id_parameter:
 *     in: path
 *     name: user_id
 *     description: "The user id"
 *     required: true
 *     schema:
 *       type: string
 *       example: "a1b2c3d"
 */
