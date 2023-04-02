import factories from "./factories/index";
import participantRepository from "../src/repository/participantRepository";
import messagesRepository from "../src/repository/messagesRepository";
import participantService from "../src/services/participantService";
import messageService from "../src/services/messageService";
import {
    participantType,
    messageType,
    completeMessageType
} from ".././src/interfaces/index"

//Partipant unit tests
describe("Unit Participant Service tests", () => {
    it("should create a participant", async () => {
        const participantName = factories.fakeParticipant;

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
        const participants: participantType[] = factories.fakeParticipants;

        jest.spyOn(participantRepository, "findAllParticipants")
            .mockImplementationOnce(async () => participants);

        const names = await participantService.getAllParticipants();

        expect(names).toBe(participants);
    });
});

//message unit tests
describe("Unit Participant Service tests", () => {
    it("should create a message", async () => {
        const message: messageType = factories.fakeMessage;

        const user: string = factories.fakeParticipant;

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce(async () => user);

        jest.spyOn(messagesRepository, "createMessage")
            .mockImplementationOnce((): any => { });


        await messageService.gatherDatas(message, user)

        expect(messagesRepository.createMessage).toBeCalled();
    });

    it("it shouldn't create a message because participant doesn't exist", async () => {
        const message: messageType = factories.fakeMessage;

        const user: string = factories.fakeParticipant;

        jest.spyOn(participantRepository, "findParticipant")
            .mockImplementationOnce(async () => { });

        jest.spyOn(messagesRepository, "createMessage")
            .mockImplementationOnce((): any => { });

        try {
            await messageService.gatherDatas(message, user)
        } catch (e) {
            expect(e.response.message).toMatch("Usuário não cadastrado no banco de dados!");
        }
    });

    it("it should get all messages from a user", async () => {
        const user = factories.fakeParticipant;
        const allMessagesTo = factories.allFakeMessagesTo(user);
        const allMessagesFrom = factories.allFakeMessagesFrom(user);

        jest.spyOn(messagesRepository, "findMessages")
            .mockImplementationOnce(async () => allMessagesTo)
            .mockImplementationOnce(async () => allMessagesFrom)
        
        const messages = await messageService.getMessages(undefined, user);

        expect(messages).toEqual([...allMessagesTo, ...allMessagesFrom])
    }); 

    it("it shoult get a specific number of messages", async () => {
        const user = factories.fakeParticipant;
        const allMessagesTo = factories.allFakeMessagesTo(user);
        const allMessagesFrom = factories.allFakeMessagesFrom(user);

        jest.spyOn(messagesRepository, "findMessages")
            .mockImplementationOnce(async () => allMessagesTo)
            .mockImplementationOnce(async () => allMessagesFrom)
        
        const limit = factories.generateRandomNumber(1, 100) + ""; //must be string
        
        const messages = await messageService.getMessages(limit, user);

        expect(messages.length).toBeLessThanOrEqual(parseInt(limit))
    })
});