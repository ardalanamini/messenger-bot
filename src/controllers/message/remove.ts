import { RequestHandler } from "express";

const CONTROLLER: RequestHandler = async function remove(req, res) {
  const message = req.params.message!;

  await message.remove();

  res.json({ message: "Ok" });
};

export default CONTROLLER;
