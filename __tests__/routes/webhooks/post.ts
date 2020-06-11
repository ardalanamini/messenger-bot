import bot from "@bot/bootstrap";
import * as messenger from "@bot/services/messenger";
import { connect, disconnect, reset, factories } from "@tests/_internals";
import moment from "moment";
import supertest from "supertest";

jest.mock("../../../src/services/messenger");

beforeAll(connect);

beforeEach(reset);

afterAll(disconnect);

/*------------------------- TESTS -------------------------*/

it("should response with 404 status", async () => {
  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "not-page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "Hello",
              },
            },
          ],
        },
      ],
    })
    .expect(404);
});

it("should ask for the name after initial hello message", async () => {
  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "Hello",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).profile.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).profile.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(2);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Hey there");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][1]).toBe("What's your first name?");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][2]).toEqual([
        {
          content_type: "text",
          title: "Ardalan",
          payload: "Ardalan",
        },
      ]);
    });
});

it("should process the first name", async () => {
  await factories.user();

  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "Ardalan",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(2);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Nice to meet you Ardalan :)");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][1]).toMatch(/^Now, What's your birth date\? \(eg\. [0-9]{4}-[0-9]{2}-[0-9]{2}\)$/);
    });
});

it("should process the quick reply first name", async () => {
  await factories.user();

  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "Ardalan",
                quick_reply: {
                  payload: "Ardalan",
                },
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(2);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Nice to meet you Ardalan :)");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][1]).toMatch(/^Now, What's your birth date\? \(eg\. [0-9]{4}-[0-9]{2}-[0-9]{2}\)$/);
    });
});

it("should fail processing the birth date", async () => {
  await factories.user({ name: { first: "Ardalan" } });

  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "1995-01-01",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(1);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Do you want to know how many days remain till your next birthday?");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][2]).toEqual(
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
        ]);
    });
});

it("should process the birth date", async () => {
  await factories.user({ name: { first: "Ardalan" } });

  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "not 1995-01-01",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(2);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Sorry, I didn't understand!");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][1]).toMatch(/^Would you send your birth date again\? \(eg\. [0-9]{4}-[0-9]{2}-[0-9]{2}\)$/);
    });
});

it("should process days until next birthday", async () => {
  await factories.user({
    name: { first: "Ardalan" },
    birth_date: moment("1995-01-01", "YYYY-MM-DD").toDate(),
  });

  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "Yes",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(2);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Let me see");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][1]).toMatch(/^There are [0-9]+ days left until your next birthday$/);
    });
});

it("should process days until next birthday using quick reply", async () => {
  await factories.user({
    name: { first: "Ardalan" },
    birth_date: moment("1995-01-01", "YYYY-MM-DD").toDate(),
  });

  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "yeah",
                quick_reply: {
                  payload: "yeah"
                }
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(2);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Let me see");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[1][1]).toMatch(/^There are [0-9]+ days left until your next birthday$/);
    });
});

it("should say goodbye", async () => {
  await factories.user({
    name: { first: "Ardalan" },
    birth_date: moment("1995-01-01", "YYYY-MM-DD").toDate(),
  });

  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "Nope",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(1);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Goodbye 👋");
    });
});

it("should fail to process days until next birthday", async () => {
  await factories.user({
    name: { first: "Ardalan" },
    birth_date: moment("1995-01-01", "YYYY-MM-DD").toDate(),
  });

  await supertest(bot)
    .post("/webhooks")
    .send({
      object: "page",
      entry: [
        {
          messaging: [
            {
              sender: {
                id: "test_user_id",
              },
              message: {
                text: "I don't know",
              },
            },
          ],
        },
      ],
    })
    .expect(200)
    .expect(() => {
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls.length).toBe(1);
      expect((messenger as jest.Mocked<typeof messenger>).see.mock.calls[0][0]).toBe("test_user_id");

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls.length).toBe(1);

      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][0]).toBe("test_user_id");
      expect((messenger as jest.Mocked<typeof messenger>).text.mock.calls[0][1]).toBe("Sorry, I didn't understand!");
    });
});
