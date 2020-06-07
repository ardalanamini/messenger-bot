import { User } from "@bot/models";
import { messenger } from "@bot/services";

export default async function init(messenger_id: string) {
  await User.create({
    messenger_id,
    finished: false,
  });

  await messenger
    .text(messenger_id, "Hey there");

  const { data: profile } = await messenger.profile(messenger_id);

  await messenger
    .text(
      messenger_id,
      "What's your first name?",
      [
        {
          content_type: "text",
          title: profile.first_name,
          payload: profile.first_name,
        },
      ],
    );
}
