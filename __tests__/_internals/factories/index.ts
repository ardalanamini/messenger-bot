import { Document } from "mongoose";

export { default as message } from "./message";
export { default as user } from "./user";

export function prepare(doc: Document) {
  return JSON.parse(JSON.stringify(doc));
}
