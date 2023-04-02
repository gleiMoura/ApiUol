import { faker } from "@faker-js/faker";
import { participantType, messageType, completeMessageType, fromType, toType } from "../../src/interfaces/index";
import dayjs from "dayjs";

const fakeParticipant = faker.name.firstName();

const fakeParticipants: participantType[] = [
    { name: faker.name.firstName() },
    { name: faker.name.firstName() },
    { name: faker.name.firstName() },
    { name: faker.name.firstName() },
];

const fakeMessage: messageType = {
    to: faker.name.firstName(),
    text: faker.address.cityName(),
    type: "message"
};

const allFakeMessagesTo = (to: string): completeMessageType[] => {
    const messageTo: completeMessageType = {
        from: faker.name.firstName(),
        to,
        text: faker.lorem.sentence(),
        type: "message",
        time: dayjs(faker.date.past()).format("HH:mm:ss")
    };

    let allMessages = [];

    for (let i = 0; i < faker.lorem.sentence.length; i++) {
        allMessages.push(messageTo);
    }

    return allMessages;
}

const allFakeMessagesFrom = (from: string): completeMessageType[] => {
    const messageFrom: completeMessageType = {
        from,
        to: faker.name.firstName(),
        text: faker.lorem.sentence(),
        type: "message",
        time: dayjs(faker.date.past()).format("HH:mm:ss")
    };

    let allMessages = [];

    for (let i = 0; i < generateRandomNumber(1, 100); i++) {
        allMessages.push(messageFrom);
    }

    return allMessages;
};

function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default {
    fakeParticipant,
    fakeParticipants,
    fakeMessage,
    allFakeMessagesFrom,
    allFakeMessagesTo,
    generateRandomNumber
} 