import { Message } from "@bot/models";
import { RequestHandler } from "express";

export interface Query {
  page?: number;
  limit?: number;
}

const CONTROLLER: RequestHandler<any, any, any, Query> = async function get(req, res) {
  let messages: Message.SCHEMA[] = [];
  let { page = 0, limit = 10 } = req.query;

  page = +page;
  limit = +limit;

  const total = await Message.countDocuments();

  if (total > 0) {
    messages = await Message
      .find()
      .skip(page * limit)
      .limit(limit)
      .populate("user");
  }

  res.json({
    messages,
    meta: {
      page,
      limit,
      page_count: messages.length,
      total_count: total,
    },
  });
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
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "Zero based pagination page"
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *       - in: query
 *         name: limit
 *         description: "Pagination limit"
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 10
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
 *                 - meta
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: "#/definitions/Message"
 *                     type: object
 *                 meta:
 *                   type: object
 *                   required:
 *                     - page
 *                     - limit
 *                     - page_count
 *                     - total_count
 *                   properties:
 *                     page:
 *                       type: integer
 *                       minimum: 0
 *                       default: 0
 *                     limit:
 *                       type: integer
 *                       minimum: 0
 *                       default: 10
 *                     page_count:
 *                       type: integer
 *                       minimum: 0
 *                     total_count:
 *                       type: integer
 *                       minimum: 0
 */
