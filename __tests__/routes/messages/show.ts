import bot from "@bot/bootstrap";
import { connect, disconnect, reset, factories } from "@tests/_internals";
import { Types } from "mongoose";
import supertest from "supertest";

const { ObjectId } = Types;

beforeAll(connect);

beforeEach(reset);

afterAll(disconnect);

/*------------------------- TESTS -------------------------*/

it("should response 404 not found when requested by an invalid id", async () => {
  await supertest(bot)
    .get("/messages/some-invalid-id")
    .expect(404)
    .expect(res => {
      expect(res.body).toEqual({
        message: "Message Not Found",
      });
    });
});

it("should response 404 not found", async () => {
  await supertest(bot)
    .get(`/messages/${new ObjectId()}`)
    .expect(404)
    .expect(res => {
      expect(res.body).toEqual({
        message: "Message Not Found",
      });
    });
});

it("should response the requested message", async () => {
  const message = await factories.message();

  await message.populate("user").execPopulate();

  await supertest(bot)
    .get(`/messages/${message._id}`)
    .expect(200)
    .expect(res => {
      expect(res.body).toEqual({
        message: factories.prepare(message),
      });
    });
});
