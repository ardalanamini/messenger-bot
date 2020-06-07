import { Message, User } from "@bot/models";
import * as processors from "@bot/processors";
import { messenger } from "@bot/services";
import { RequestHandler } from "express";

const CONTROLLER: RequestHandler = async function post(req, res) {
  const body = req.body;

  // Checking for page subscription.
  if (body.object === "page") {
    res.sendStatus(200);

    // Iterate over each entry, there can be multiple entries if callbacks are batched.
    for (const entry of body.entry) {
      // Iterate over each messaging event
      for (const event of entry.messaging) {
        if ("message" in event) {
          if (!event.message.is_echo) {
            const message = event.message;
            const messenger_id = event.sender.id;

            await Message.create({
              messenger_id,
              text: message.text,
            });

            await messenger
              .see(messenger_id);

            const user = await User.findOne({ messenger_id });

            if (user == null) await processors.init(messenger_id);
            else {
              // Ask for the name
              if (user.name?.first == null) await processors.name(user, message);
              // Ask for the birth date
              else if (user.birth_date == null) await processors.birth_date(user, message);
              // Check the answer for the question about days until the next birthday
              else if (!user.finished) await processors.next_birthday(user, message);
              // That's all folks
              else {
                await messenger
                  .text(messenger_id, "Sorry, that was all I could do for now!");
              }
            }
          }
        }
      }
    }
  }
};

export default CONTROLLER;
