import { User } from "@bot/models";
import { messenger } from "@bot/services";
import moment from "moment";

export default async function next_birthday(user: User.SCHEMA, message: { [key: string]: any }) {
  user.finished = true;
  let answer = message.text;

  if ("quick_reply" in message) answer = message.quick_reply.payload;

  // could apply positivity too?
  if (/(yeah|yes|yup|sure|what ever|why not)/i.test(answer)) {
    const today = moment();
    const date = moment(user.birth_date);

    let diff = date.year(today.year()).diff(today, "days");

    if (diff < 0) diff = date.year(today.year() + 1).diff(today, "days");

    await messenger
      .text(
        user.messenger_id,
        "Let me see",
      );

    await messenger
      .text(
        user.messenger_id,
        `There are ${diff} days left until your next birthday`,
      );
  } else if (/^(nope|no|nah)$/i.test(answer)) {
    await messenger
      .text(
        user.messenger_id,
        "Goodbye 👋",
      );
  } else {
    await messenger
      .text(user.messenger_id, "Sorry, I didn't understand!");

    user.finished = false;
  }

  await user.save();
}
