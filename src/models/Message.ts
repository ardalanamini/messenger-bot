import { Document, Model, model, Schema } from "mongoose";

// ------------------------- Interfaces -------------------------

namespace Message {
  export interface SCHEMA extends Document {
    messenger_id: string;

    text: string;
  }

  export type MODEL = Model<SCHEMA>
}

// ------------------------- Schema -------------------------

const SCHEMA = new Schema(
  {
    messenger_id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    collection: "messages",
    timestamps: {
      createdAt: true,
    },
  },
);

// ------------------------- Settings -------------------------

SCHEMA.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;

    return ret;
  },
});

// ------------------------- Methods -------------------------

// ------------------------- Relations -------------------------

SCHEMA.virtual("user", {
  ref: "User",
  localField: "messenger_id",
  foreignField: "messenger_id",
  justOne: true,
});

// ------------------------- Plugins -------------------------

// ------------------------- Model -------------------------

const Message = model<Message.SCHEMA, Message.MODEL>("Message", SCHEMA);

export default Message;

/**
 * @swagger
 *
 * definitions:
 *
 *   Message:
 *     allOf:
 *       - $ref: "#/definitions/DBItem"
 *       - type: object
 *         required:
 *           - messenger_id
 *           - text
 *         properties:
 *           messenger_id:
 *             type: string
 *             example: "1234567890"
 *           text:
 *             type: string
 *             example: "Hello"
 *           user:
 *             $ref: "#/definitions/User"
 *
 * parameters:
 *
 *   message_id_parameter:
 *     in: path
 *     name: message_id
 *     description: "The message id"
 *     required: true
 *     schema:
 *       type: string
 *       example: "a1b2c3d"
 */
