"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var express_1 = __importDefault(require("express"));
var login_routes_1 = require("./routes/login-routes");
var port = 3000;
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({ keys: ['keys'] }));
app.use(login_routes_1.router);
app.listen(port, function () {
    console.log("Server started on port " + port + "...");
});
