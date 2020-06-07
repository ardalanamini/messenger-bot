import { message } from "@bot/controllers";
import { routing } from "@bot/utils";
import { Router } from "express";

const { safe } = routing;

const router = Router();

router.param("message", safe(message.param));

router
  .route("/")
  .get(safe(message.get));

router
  .route("/:message")
  .get(safe(message.show))
  .delete(safe(message.remove));

export default Router().use("/messages", router);
