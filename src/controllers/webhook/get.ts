import { config } from "@bot/utils";
import { RequestHandler } from "express";

const CONTROLLER: RequestHandler = function get(req, res) {
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (token === config.BOT_VERIFY_TOKEN) {
    // Responds with the challenge token from the request
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    // Responds with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
};

export default CONTROLLER;
