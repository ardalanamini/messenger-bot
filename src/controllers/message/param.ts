import { Message } from "@bot/models";
import { RequestHandler } from "express";
import { Types } from "mongoose";

const { ObjectId } = Types;

declare module "express-serve-static-core" {
  interface ParamsDictionary {
    message?: Message.SCHEMA;
  }
}


const CONTROLLER: RequestHandler = async function param(req, res, next) {
  const id = req.params.message as any;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Message Not Found" });
  }

  const message = await Message.findById(id);

  if (message == null) {
    return res.status(404).json({ message: "Message Not Found" });
  }

  req.params.message = message;

  next();
};

export default CONTROLLER;
