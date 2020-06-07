import { User } from "@bot/models";
import { messenger } from "@bot/services";
import moment from "moment";

export default async function name(user: User.SCHEMA, message: { [key: string]: any }) {
  if (user.name == null) user.name = {};

  if ("quick_reply" in message) {
    user.name.first = message.quick_reply.payload;
  } else if ("text" in message) {
    user.name.first = message.text;
  } else {
    await messenger
      .text(user.messenger_id, "Sorry, I couldn't understand!");

    return;
  }

  await user.save();

  await messenger
    .text(
      user.messenger_id,
      `Nice to meet you ${user.name.first} :)`,
    );

  await messenger
    .text(
      user.messenger_id,
      `Now, What's your birth date? (eg. ${moment().format("YYYY-MM-DD")})`,
    );
}
