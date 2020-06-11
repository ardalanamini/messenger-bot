/* istanbul ignore file */

import { config } from "@bot/utils";
import bodyParser from "body-parser";
import crypto from "crypto";
import http from "http";

export default function json() {
  return bodyParser.json({
    verify(req: http.IncomingMessage, res: http.ServerResponse, buf: Buffer) {
      if (process.env.NODE_ENV === "test") return;

      const signature = req.headers["x-hub-signature"] as string | undefined;

      if (!signature) {
        throw new Error("Couldn't validate the request signature.");
      } else {
        const elements = signature.split("=");
        const signatureHash = elements[1];
        const expectedHash = crypto
          .createHmac("sha1", config.BOT_SECRET)
          .update(buf)
          .digest("hex");

        if (signatureHash != expectedHash) {
          throw new Error("Couldn't validate the request signature.");
        }
      }
    },
  });
}
