export { default as Message } from "./Message";
export { default as User } from "./User";

/**
 * @swagger
 *
 *  definitions:
 *    DBItem:
 *      type: object
 *      required:
 *        - id
 *        - created_at
 *        - updated_at
 *      properties:
 *        id:
 *          type: string
 *          readOnly: true
 *          example: "a1b2c3d"
 *        created_at:
 *          type: string
 *          readOnly: true
 *          format: date-time
 *          example: "2017-07-21T17:32:28Z"
 *        updated_at:
 *          type: string
 *          readOnly: true
 *          format: date-time
 *          example: "2017-07-21T17:32:28Z"
 */

