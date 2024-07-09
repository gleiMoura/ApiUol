import factories from "./factories/index";
import participantRepository from "../src/repository/participantRepository";
import messagesRepository from "../src/repository/messagesRepository";
import participantService from "../src/services/participantService";
import messageService from "../src/services/messageService";
import {
    messageType,
    userType,
} from "../src/interfaces/index"
import { WithId } from "mongodb";
import { stringify } from "querystring";

//Partipant unit tests
describe("Unit Participant Service tests", () => {
    it("should create a participant", async () => {
        const participantName = factories.fakeParticipant;

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce((): any => undefined);

        jest.spyOn(participantRepository, "createParticipant")
            .mockImplementationOnce((): any => "created");

        await participantService.registerParticipant(participantName);

        expect(participantRepository.createParticipant).toHaveBeenCalledWith(participantName);
    });

    it("shouldn't create an exist participant", async () => {
        const participantName = factories.fakeParticipant;

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce((): any => participantName);

        try {
            await participantService.registerParticipant(participantName);
        } catch (e) {
            expect(e.response.message).toMatch("Usuário já existe no sistema. Escolha outro nome!");
        }
    });

    it("should get all participants", async () => {
        const participants: any = factories.fakeParticipants;

        jest.spyOn(participantRepository, "findAllParticipants")
            .mockImplementationOnce(async () => participants);

        const names = await participantService.getAllParticipants();

        expect(names).toBe(participants);
    });
});

//message unit tests
describe("Unit Messages Service tests", () => {
    it("should create a message", async () => {
        const message: messageType = factories.fakeMessage;

        const user: any = factories.fakeParticipant;

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce(async () => user);

        jest.spyOn(messagesRepository, "createMessage")
            .mockImplementationOnce((): any => { });


        await messageService.gatherDatas(message, user)

        expect(messagesRepository.createMessage).toBeCalled();
    });

    it("it shouldn't create a message because participant doesn't exist", async () => {
        const message = factories.fakeMessage;
        const user = factories.fakeParticipant;

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce(async () => null);

        try {
            await messageService.gatherDatas(message, user);
            throw new Error("Expected error was not thrown");
        } catch (e) {
            expect(e.response).toBeDefined();
            expect(e.response.message).toMatch("Usuário não cadastrado no banco de dados!");
        }
    });

    it("it should get all messages from a user", async () => {
        const user: any = factories.fakeParticipant;
        const allMessages: any = factories.allFakeMessages(user);

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce(async () => user);

        jest.spyOn(messagesRepository, "createMessage")
            .mockImplementationOnce((): any => { });

        jest.spyOn(messagesRepository, "findMessages")
            .mockImplementationOnce(async () => allMessages)

        const messages = await messageService.getMessages(undefined, user);

        expect(messages).toEqual([...allMessages])
    });

    it("it shoult get a specific number of messages", async () => {
        const user: any = factories.fakeParticipant;
        const allMessages: any = factories.allFakeMessages(user);

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce(async () => user);

        jest.spyOn(messagesRepository, "createMessage")
            .mockImplementationOnce((): any => { });

        jest.spyOn(messagesRepository, "findMessages")
            .mockImplementationOnce(async () => allMessages)

        const limit = factories.generateRandomNumber(1, 100) + ""; //must be string

        const messages = await messageService.getMessages(limit, user);

        expect(messages.length).toBeLessThanOrEqual(parseInt(limit))
    })
});