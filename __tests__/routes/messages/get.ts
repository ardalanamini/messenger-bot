import bot from "@bot/bootstrap";
import { connect, disconnect, reset, factories } from "@tests/_internals";
import supertest from "supertest";

beforeAll(connect);

beforeEach(reset);

afterAll(disconnect);

/*------------------------- TESTS -------------------------*/

it("should response zero messages", async () => {
  await supertest(bot)
    .get("/messages")
    .expect(200)
    .expect(res => {
      expect(res.body).toEqual({
        messages: [],
        meta: {
          page: 0,
          limit: 10,
          page_count: 0,
          total_count: 0,
        },
      });
    });
});

it("should response the messages received from any user", async () => {
  const message = await factories.message();

  await message.populate("user").execPopulate();

  await supertest(bot)
    .get("/messages")
    .expect(200)
    .expect(res => {
      expect(res.body).toEqual({
        messages: [
          factories.prepare(message),
        ],
        meta: {
          page: 0,
          limit: 10,
          page_count: 1,
          total_count: 1,
        },
      });
    });
});
