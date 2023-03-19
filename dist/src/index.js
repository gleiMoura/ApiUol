"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_js_1 = __importDefault(require("./app.js"));
var chalk_1 = __importDefault(require("chalk"));
app_js_1["default"].listen(5000, function () {
    console.log(chalk_1["default"].green.bold("Server is running!"));
});
