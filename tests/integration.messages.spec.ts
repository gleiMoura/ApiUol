import app from "../src/app"
import supertest from "supertest";
import factories from "./factories/index";
import db from "../src/config/index";

afterEach(async () => {
    const database = await db;
    const collections = await database.collections();
    for(let collection of collections) {
        await collection.deleteMany({});
    }
})

describe("POST /messages", () => {
    it("Given a valid message and user name it must return 201", async () => {
        const message = factories.fakeMessage;
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants").send({ name: user })

        const result = await supertest(app)
            .post("/messages")
            .set('User', user)
            .send(message);

        const status = result.status;

        const database = await db;
        const createdMessage = await database.collection("messages").findOne({ from: user });

        expect(status).toEqual(201);
        expect(createdMessage).not.toBeNull();
    });

    it("Given an invalid user name it must return error 409", async () => {
        const message = factories.fakeMessage;
        const user = factories.fakeParticipant + "*" //error;

        await supertest(app)
            .post("/participants").send({ name: user })

        const result = await supertest(app)
            .post("/messages")
            .set('User', user)
            .send(message);

        const status = result.status;

        const database = await db;
        const createdMessage = await database.collection("messages")
            .findOne({ from: user });

        expect(status).toEqual(409);
        expect(createdMessage).toBeNull();
    });

    it("Given an invalid message it must return error 410", async () => {
        const user = factories.fakeParticipant;
        const message = ""

        await supertest(app)
            .post("/participants").send({ name: user })

        const result = await supertest(app)
            .post("/messages")
            .set('User', user)
            .send(message);

        const status = result.status;

        const database = await db;
        const createdMessage = await database.collection("messages").findOne({ from: user, type: "message" || "private_message" });

        expect(status).toEqual(410);
        expect(createdMessage).toBeNull();
    });
});

describe("GET /messages", () => {
    it("Given a valid user name it must return 201", () => {

    });

    it("Given a valid user name and a valid massage limit it must return 201", () => {

    });

    it("Given an invalid user name it must return error 410", () => {

    });

    it("Given an invalid limit it must return 201", () => {

    });
})

describe("DELETE /messages/:id", () => {
    it("Given a valid message it must return 201", () => {

    });

    it("Given an invalid message it must return 410", () => {

    });

    it("Given an nonexistent message it must return 404", () => {

    });

    it("Given a user that is not owner from the message it must return 401", () => {

    });
});

describe("PUT /messages/:id", () => {
    it("Given a valid message it must return 201", () => {

    });

    it("Given an invalid message it must return 410", () => {

    });

    it("Given an nonexistent message it must return 404", () => {

    });

    it("Given a user that is not owner from the message it must return 401", () => {

    });
});

describe("", () => {
    it("Given a valid message, id and new message it must return 201", () => {

    });

    it("Given a nonexitent message it must return 404", () => {

    });

    it("Given a nonexitent user name it must return 422", () => {

    });

    it("Given a user that is not owner from the message it must return 401", () => {

    });
});