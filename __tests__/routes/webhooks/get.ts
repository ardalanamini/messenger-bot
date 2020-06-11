import bot from "@bot/bootstrap";
import { config } from "@bot/utils";
import { connect, disconnect, reset } from "@tests/_internals";
import supertest from "supertest";

beforeAll(connect);

beforeEach(reset);

afterAll(disconnect);

/*------------------------- TESTS -------------------------*/

it("should verify the token", async () => {
  await supertest(bot)
    .get("/webhooks")
    .query({
      "hub.verify_token": config.BOT_VERIFY_TOKEN,
      "hub.challenge": "CHALLENGE_ACCEPTED",
      "hub.mode": "subscribe",
    })
    .expect(200);
});

it("should fail to verify the token", async () => {
  await supertest(bot)
    .get("/webhooks")
    .query({
      "hub.verify_token": "wrong_verify_token",
      "hub.challenge": "CHALLENGE_ACCEPTED",
      "hub.mode": "subscribe",
    })
    .expect(403);
});
