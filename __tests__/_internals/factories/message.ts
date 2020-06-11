import faker from "faker";
import { Message } from "@bot/models";

// eslint-disable-next-line @typescript-eslint/ban-types
export default (data: object = {}) =>
  Message.create({
    messenger_id: faker.random.number().toString(),
    text: faker.lorem.word(),
    ...data,
  });
