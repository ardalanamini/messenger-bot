import { User } from "@bot/models";

// eslint-disable-next-line @typescript-eslint/ban-types
export default (data: object = {}) =>
  User.create({
    messenger_id: "test_user_id",
    finished: false,
    ...data,
  });
