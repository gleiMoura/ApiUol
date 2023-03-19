"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var participantRouter_js_1 = __importDefault(require("./participantRouter.js"));
var messagesRouter_js_1 = __importDefault(require("./messagesRouter.js"));
var router = (0, express_1["default"])();
router.use(participantRouter_js_1["default"]);
router.use(messagesRouter_js_1["default"]);
exports["default"] = router;
