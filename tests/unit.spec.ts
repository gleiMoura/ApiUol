import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import participantRepository from "../src/repository/participantRepository";
import messagesRepository from "../src/repository/messagesRepository";
import participantService from "../src/services/participantService";
import messageService from "../src/services/messageService";
import {
    participantType,
    messageType
} from ".././src/interfaces/index"

//Partipant unit tests
describe("Unit Participant Service tests", () => {
    it("should create a participant", async () => {
        const participantName = faker.name.firstName();

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce((): any => { });

        jest.spyOn(participantRepository, "createParticipant")
            .mockImplementationOnce((): any => "created");

        jest.spyOn(participantRepository, "createEnterMessage")
            .mockImplementationOnce((): any => "Message was created!");

        await participantService.registerParticipant(participantName);

        expect(participantRepository.createParticipant).toBeCalled();
        expect(participantRepository.createEnterMessage).toBeCalled();
    });

    it("should get all participants", async () => {
        const participants: participantType[] = [
            { name: faker.name.firstName() },
            { name: faker.name.firstName() },
            { name: faker.name.firstName() },
            { name: faker.name.firstName() },
        ];

        jest.spyOn(participantRepository, "findAllParticipants")
            .mockImplementationOnce(async () => participants);

        const names = await participantService.getAllParticipants();

        expect(names).toBe(participants);
    });
});

//message unit tests
describe("Unit Participant Service tests", () => {
    it("should create a message", async () => {
        const message: messageType = {
            to: faker.name.firstName(),
            text: faker.address.cityName(),
            type: "message"
        };

        const user: string = faker.name.firstName();

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce(async () => user);

        jest.spyOn(messagesRepository, "createMessage")
            .mockImplementationOnce((): any => {});


        await messageService.gatherDatas(message, user)

        expect(messagesRepository.createMessage).toBeCalled();
    });
});