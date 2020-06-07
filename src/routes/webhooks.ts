import { webhook } from "@bot/controllers";
import { routing } from "@bot/utils";
import { Router } from "express";

const { safe } = routing;

const router = Router();

router
  .route("/")
  .get(safe(webhook.get))
  .post(safe(webhook.post));

export default Router().use("/webhooks", router);
