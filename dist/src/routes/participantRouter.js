"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var schemaValidator_js_1 = __importDefault(require("../middlewares/schemaValidator.js"));
var participantSchema_js_1 = __importDefault(require("../schemas/participantSchema.js"));
var participantController_js_1 = require("../controllers/participantController.js");
var participantRouter = (0, express_1["default"])();
participantRouter.post("/participants", (0, schemaValidator_js_1["default"])(participantSchema_js_1["default"]), participantController_js_1.createRegister);
participantRouter.get("/participants", participantController_js_1.getPartipantsList);
exports["default"] = participantRouter;
