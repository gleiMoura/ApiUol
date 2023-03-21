import { faker } from "@faker-js/faker";
import participantRepository from "../src/repository/participantRepository.js";
import participantService from "../src/services/participantService.js";

describe("Unit Services tests", () => {
    it("should create a participant", async () => {
        const participantName = faker.name.firstName();

        jest.spyOn(participantRepository, "findParticipant")
        .mockImplementationOnce((): any => {});
        
        jest.spyOn(participantRepository, "createParticipant")
        .mockImplementationOnce((): any => "created");

        jest.spyOn(participantRepository, "createEnterMessage")
        .mockImplementationOnce((): any => "Message was created!");

        await participantService.registerParticipant(participantName);

        expect(participantRepository.createParticipant).toBeCalled();
        expect(participantRepository.createEnterMessage).toBeCalled();
    });
})