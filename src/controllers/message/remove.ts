import { RequestHandler } from "express";

const CONTROLLER: RequestHandler = async function remove(req, res) {
  const message = req.params.message!;

  await message.remove();

  res.json({ message: "Ok" });
};

export default CONTROLLER;

/**
 * @swagger
 *
 * /messages/{message_id}:
 *   delete:
 *     tags:
 *       - Message
 *     description: Delete message
 *     parameters:
 *       - $ref: "#/parameters/message_id_parameter"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Deleted the requested message successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ok
 */
