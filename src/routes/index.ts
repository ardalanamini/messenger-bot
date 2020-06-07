import { Router } from "express";
import messages from "./messages";
import webhooks from "./webhooks";

const router = Router();

router
  .use(messages)
  .use(webhooks);

export default router;
