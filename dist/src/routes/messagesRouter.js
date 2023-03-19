"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var schemaValidator_js_1 = __importDefault(require("../middlewares/schemaValidator.js"));
var messageSchema_js_1 = __importDefault(require("../schemas/messageSchema.js"));
var messageController_js_1 = require("../controllers/messageController.js");
var messagesRouter = (0, express_1.Router)();
messagesRouter.post("/messages", (0, schemaValidator_js_1["default"])(messageSchema_js_1["default"]), messageController_js_1.createMessage);
messagesRouter.get("/messages", messageController_js_1.sendMessages);
exports["default"] = messagesRouter;
