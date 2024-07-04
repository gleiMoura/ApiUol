import supertest from "supertest";
import factories from "./factories";
import app from "../src/app";

describe("POST participants", () => {
    it("Given a valid user name must return 201", async () => {
        const user = factories.fakeParticipant;

        const result = await supertest(app)
            .post("/participants")
            .send({name: user})

        const status = result.status;

        expect(status).toEqual(201);
    });

    it("", async () => {

    });
})