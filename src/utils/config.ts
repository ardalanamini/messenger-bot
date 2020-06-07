/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV ?? "development";

export const MONGODB_PATH = process.env.MONGODB_PATH!;

export const BOT_ID = process.env.BOT_ID!;
export const BOT_SECRET = process.env.BOT_SECRET!;
export const BOT_PAGE_ID = process.env.BOT_PAGE_ID!;
export const BOT_PAGE_TOKEN = process.env.BOT_PAGE_TOKEN!;
export const BOT_VERIFY_TOKEN = process.env.BOT_VERIFY_TOKEN!;
