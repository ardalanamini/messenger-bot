/* istanbul ignore file */

import { config } from "@bot/utils";
import Axios from "axios";

const AXIOS = Axios.create({
  baseURL: "https://graph.facebook.com/v7.0",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export function see(recipient: string) {
  return AXIOS
    .post(
      "/me/messages",
      {
        recipient: { id: recipient },
        sender_action: "mark_seen",
      },
      {
        params: {
          access_token: config.BOT_PAGE_TOKEN,
        },
      },
    );
}

export function typing(recipient: string, active = true) {
  return AXIOS
    .post(
      "/me/messages",
      {
        recipient: { id: recipient },
        sender_action: active ? "typing_on" : "typing_off",
      },
      {
        params: {
          access_token: config.BOT_PAGE_TOKEN,
        },
      },
    );
}

export async function text(recipient: string, text: string, quick_replies?: QuickReply[]) {
  await typing(recipient);

  return AXIOS
    .post(
      "/me/messages",
      {
        recipient: { id: recipient },
        message: {
          text,
          quick_replies,
        },
      },
      {
        params: {
          access_token: config.BOT_PAGE_TOKEN,
        },
      },
    )
    .catch(
      error => typing(recipient, false)
        .finally(() => {
          throw error;
        }),
    );
}

export function profile(id: string) {
  return AXIOS
    .get(
      `/${id}`,
      {
        params: {
          access_token: config.BOT_PAGE_TOKEN,
          fields: [ "first_name", "last_name", "gender", "locale", "timezone" ]
            .join(", "),
        },
      },
    );
}

export interface QuickReply {
  content_type: "text" | "user_phone_number" | "user_email",
  title: string,
  payload: string
  image_url?: string
}
