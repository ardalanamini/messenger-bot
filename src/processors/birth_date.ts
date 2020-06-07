import { User } from "@bot/models";
import { messenger } from "@bot/services";
import moment from "moment";

export default async function birth_date(user: User.SCHEMA, message: { [key: string]: any }) {
  const date = moment(message.text, "YYYY-MM-DD").toDate();

  if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(message.text) && date.toString() !== "Invalid Date") {
    user.birth_date = date;

    await user.save();

    await messenger
      .text(
        user.messenger_id,
        "Do you want to know how many days remain till your next birthday?",
        [
          {
            content_type: "text",
            title: "nope",
            payload: "nope",
          },
          {
            content_type: "text",
            title: "yeah",
            payload: "yeah",
          },
        ],
      );
  } else {
    await messenger
      .text(user.messenger_id, "Sorry, I didn't understand!");

    await messenger
      .text(user.messenger_id, `Would you send your birth date again? (eg. ${moment().format("YYYY-MM-DD")})`);
  }
}
