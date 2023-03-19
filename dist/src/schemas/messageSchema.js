"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var messageSchema = joi_1["default"].object({
    to: joi_1["default"].string().required(),
    text: joi_1["default"].string().required(),
    type: joi_1["default"].string().required().valid("message", "private_message")
});
exports["default"] = messageSchema;
