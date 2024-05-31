import { faker } from "@faker-js/faker";
import { messageType, completeMessageType } from "../../src/interfaces/index";
import dayjs from "dayjs";

const fakeParticipant = faker.name.firstName();

const fakeParticipants = [
    { name: faker.name.firstName(), _id: faker.unique },
];

const fakeMessage: messageType = {
    to: faker.name.firstName(),
    text: faker.address.cityName(),
    type: "message"
};

const allFakeMessages = (from: string): completeMessageType[] => {
    const messageFrom: completeMessageType = {
        from,
        to: faker.name.firstName(),
        text: faker.lorem.sentence(),
        type: "message",
        time: dayjs(faker.date.past()).format("HH:mm:ss")
    };

    const messageTo: completeMessageType = {
        from,
        to: faker.name.firstName(),
        text: faker.lorem.sentence(),
        type: "message",
        time: dayjs(faker.date.past()).format("HH:mm:ss")
    };

    let allMessages = [];

    for (let i = 0; i < generateRandomNumber(1,50); i++) {
        allMessages.push(messageFrom);
    }

    for (let i = 0; i < generateRandomNumber(1,50); i++) {
        allMessages.push(messageTo);
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
    allFakeMessages,
    generateRandomNumber
} 