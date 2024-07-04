import supertest from "supertest";
import factories from "./factories";
import app from "../src/app";

describe("POST participants", () => {
    it("Given a valid user name must return 201", async () => {
        const user = factories.fakeParticipant;

        const result = await supertest(app)
            .post("/participants")
            .send({ name: user })

        const status = result.status;

        expect(status).toEqual(201);
    });

    it("Given a invalid user name must return 410", async () => {
        const user = factories.fakeParticipant + "^";

        const result = await supertest(app)
            .post("/participants")
            .send({ name: user })

        const status = result.status;

        expect(status).toEqual(410);
    });

    it("Given a user name that already exist must return 409", async () => {
        const user = factories.fakeParticipant;

        await supertest(app)
            .post("/participants")
            .send({ name: user })

        const result = await supertest(app)
            .post("/participants")
            .send({ name: user })

        const status = result.status;

        expect(status).toEqual(409);
    });
});

describe("GET /participants", () => {
    it("Asking for all participants must return 201", async () => {
        const result = await supertest(app)
            .get("/participants");

        const status = result.status;
        expect(status).toEqual(201)
    });
})