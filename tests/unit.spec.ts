import { faker } from "@faker-js/faker";
import participantRepository from "../src/repository/participantRepository";
import participantService from "../src/services/participantService";
import { participantType } from ".././src/interfaces/index"

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

    it("should get all participants", async () => {
        const participants:participantType[] = [
            {name: faker.name.firstName()},
            {name: faker.name.firstName()},
            {name: faker.name.firstName()},
            {name: faker.name.firstName()},
        ];

        jest.spyOn(participantRepository, "findAllParticipants")
        .mockImplementation(async () => participants);

        const names = await participantService.getAllParticipants();

        expect(names).toBe(participants);
    })
})