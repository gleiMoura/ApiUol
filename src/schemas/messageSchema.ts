import joi from "joi";

const messageSchema = joi.object({
    to: joi.string().required(),
    text: joi.string().required(),
    type: joi.string().required().valid("message", "private_message")
});

export default messageSchema;