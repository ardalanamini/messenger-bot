import { RequestHandler } from "express";

const CONTROLLER: RequestHandler = async function show(req, res) {
  const message = req.params.message!;

  await message.populate("user").execPopulate();

  res.json({ message });
};

export default CONTROLLER;

/**
 * @swagger
 *
 * /messages/{message_id}:
 *   get:
 *     tags:
 *       - Message
 *     description: Show message
 *     parameters:
 *       - $ref: "#/parameters/message_id_parameter"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The requested message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   $ref: "#/definitions/Message"
 */
