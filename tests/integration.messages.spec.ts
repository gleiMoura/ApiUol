import app from "../src/app"
import supertest from "supertest";
import factories from "./factories/index";
import db from "../src/config/index";
import { faker } from "@faker-js/faker";

afterEach(async () => {
    const database = await db;
    const collections = await database.collections();
    for (let collection of collections) {
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
    it("Given a valid user name it must return 201", async () => {
        const message = factories.fakeMessage;
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants").send({ name: user })

        await supertest(app)
            .post("/messages")
            .set('User', user)
            .send(message);

        const result = await supertest(app)
            .get('/messages')
            .set('User', user)

        const status = result.status;

        const database = await db;
        const allMessages = database.collection('messages').find({ name: user });

        expect(status).toEqual(201);
        expect(allMessages).not.toBeNull();
    });

    it("Given a valid user name and a valid massage limit it must return 201", async () => {
        const message = factories.fakeMessage;
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants").send({ name: user })

        await supertest(app)
            .post(`/messages?limit=5`)
            .set('User', user)
            .send(message);

        const result = await supertest(app)
            .get('/messages')
            .set('User', user)

        const status = result.status;

        const database = await db;
        const allMessages = database.collection('messages').find({ name: user });

        expect(status).toEqual(201);
        expect(allMessages.listenerCount.length).toBeLessThan(5);
    });

    it("Given an invalid user name it must return error 409", async () => {
        const user = factories.fakeParticipant;
        //user was not registered

        const result = await supertest(app)
            .get('/messages')
            .set('User', user)


        const status = result.status;

        expect(status).toEqual(409);
    });
})

describe("DELETE /messages/:id", () => {
    it("Given a valid id it must return 200", async () => {
        const message = factories.fakeMessage;
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants").send({ name: user })

        await supertest(app)
            .post("/messages")
            .set('User', user)
            .send(message);

        const database = await db;
        const createdMessage = await database.collection("messages").findOne({ from: user });

        const result = await supertest(app)
            .delete(`/messages/${createdMessage._id.toString()}`)
            .set('User', user)


        const status = result.status;

        expect(status).toEqual(200);
        expect(createdMessage).not.toBeNull();
    });

    it("Given an nonexistent message id it must return 404", async () => {
        const user = factories.fakeParticipant;

        const result = await supertest(app)
            .delete(`/messages/2121212121212121`)
            .set('User', user)

        const status = result.status;

        expect(status).toEqual(404);
    });

    it("Given a user that is not owner from the message it must return 401", async () => {
        const message = factories.fakeMessage;
        const firstUser = faker.name.firstName();
        const secondUser = faker.name.firstName();

        await supertest(app)
            .post("/participants").send({ name: firstUser })

        await supertest(app)
            .post("/participants").send({ name: secondUser })

        await supertest(app)
            .post("/messages")
            .set('User', firstUser)
            .send({ ...message, to: secondUser });

        const database = await db;
        const createdMessage = await database.collection("messages").findOne({ to: secondUser });

        const result = await supertest(app)
            .delete(`/messages/${createdMessage._id.toString()}`)
            .set('User', secondUser)

        const status = result.status;

        expect(status).toEqual(401);
    });
});

describe("PUT /messages/:id", () => {
    it("Given a valid message it must return 201", async () => {
        const message = factories.fakeMessage;
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants").send({ name: user })

        await supertest(app)
            .post("/messages")
            .set('User', user)
            .send(message);

        const database = await db;
        const createdMessage = await database.collection("messages").findOne({ from: user });

        const result = await supertest(app)
            .put(`/messages/${createdMessage._id.toString()}`)
            .set('User', user)
            .send({ ...message, text: faker.address.cityName() })


        const status = result.status;

        expect(status).toEqual(200);
        expect(createdMessage).not.toBeNull();
    });

    it("Given an invalid message it must return 410", async () => {
        const message = { ...factories.fakeMessage, type: "super-message" };
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants").send({ name: user })

        await supertest(app)
            .post("/messages")
            .set('User', user)
            .send(message);

        const database = await db;
        const createdMessage = await database.collection("messages").findOne({ from: user });

        const result = await supertest(app)
            .put(`/messages/${createdMessage._id.toString()}`)
            .set('User', user)
            .send({ ...message, text: faker.address.cityName() })


        const status = result.status;

        expect(status).toEqual(410);
        expect(createdMessage.type).toBe("status");
    });

    it("Given an nonexistent message it must return 404", async () => {
        const message = factories.fakeMessage;
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants").send({ name: user })

        const result = await supertest(app)
            .put(`/messages/1233334565554434`)
            .set('User', user)
            .send({ ...message, text: faker.address.cityName() })


        const status = result.status;

        expect(status).toEqual(404);
    });

    it("Given a user that is not owner from the message it must return 401", async () => {
        const message = factories.fakeMessage;
        const firstUser = faker.name.firstName();
        const secondUser = faker.name.firstName();

        await supertest(app)
            .post("/participants").send({ name: firstUser })

        await supertest(app)
            .post("/participants").send({ name: secondUser })

        await supertest(app)
            .post("/messages")
            .set('User', firstUser)
            .send({ ...message, to: secondUser });

        const database = await db;
        const createdMessage = await database.collection("messages").findOne({ to: secondUser });

        const result = await supertest(app)
            .put(`/messages/${createdMessage._id.toString()}`)
            .set('User', secondUser)
            .send({ ...message, text: faker.address.cityName() })

        const status = result.status;

        expect(status).toEqual(401);
    });
});

describe("POST /status", () => {
    it("Given a valid user it must return 200", async () => {
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants")
            .send({ name: user })

        const result = await supertest(app)
            .post("/status")
            .set("User", user)

        const status = result.status;

        expect(status).toEqual(200);
    });

    it("Given a invalid user it must return 404", async () => {
        const user = factories.fakeParticipant;

        const result = await supertest(app)
            .post("/status")
            .set("User", user)

        const status = result.status;

        expect(status).toEqual(404);
    });

});