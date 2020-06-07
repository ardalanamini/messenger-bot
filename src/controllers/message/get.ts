import { Message } from "@bot/models";
import { RequestHandler } from "express";

const CONTROLLER: RequestHandler = async function get(req, res) {
  const messages = await Message.find().populate("user");

  res.json({ messages });
};

export default CONTROLLER;
