import { Message } from "@bot/models";
import { RequestHandler } from "express";

const CONTROLLER: RequestHandler = async function get(req, res) {
  const messages = await Message.find().populate("user");

  res.json({ messages });
};

export default CONTROLLER;

/**
 * @swagger
 *
 * /messages:
 *   get:
 *     tags:
 *       - Message
 *     description: Get messages
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - messages
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: "#/definitions/Message"
 */
