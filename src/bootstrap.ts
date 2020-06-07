import "module-alias/register";

import { json } from "@bot/middlewares";
import routes from "@bot/routes";
import { config } from "@bot/utils";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import qs from "qs";

const app = express();

// ------------------------- Database -------------------------

mongoose
  .connect(config.MONGODB_PATH, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    authSource: "admin",
  })
  .catch(error => {
    console.error(error);

    process.exit(1);
  });


// ------------------------- Settings -------------------------

app.disable("x-powered-by");

app.set("query parser", qs.parse);

app.set("json replacer fn", (key: string, value: unknown) => {
  return key[0] === "_" ? undefined : value;
});

// ------------------------- Middlewares -------------------------

app
  .use(cors())
  .use(helmet())
  .use(json())
  .use(bodyParser.urlencoded({ extended: true }));

// ------------------------- Routes -------------------------

app
  .use(routes);

// ------------------------- Exports -------------------------

export default app;
