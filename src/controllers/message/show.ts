import { RequestHandler } from "express";

const CONTROLLER: RequestHandler = async function show(req, res) {
  const message = req.params.message!;

  await message.populate("user").execPopulate();

  res.json({ message });
};

export default CONTROLLER;
