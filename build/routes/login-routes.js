"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
exports.router = express_1.Router();
var relativePath = '../../src/static';
var validEmail = 'hi@hi.com';
var validPassword = 'pass';
exports.router.get('/login', function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, relativePath, 'login.html'));
});
exports.router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (areCredsValid(email, password)) {
        req.session = { isLoggedIn: true };
        res.redirect('/');
    }
    else {
        res.redirect('/login-failed');
    }
});
exports.router.get('/login-failed', function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, relativePath, 'login-failed.html'));
});
exports.router.get('/', function (req, res) {
    if (req.session && req.session.isLoggedIn) {
        res.sendFile(path_1.default.resolve(__dirname, relativePath, 'homepage-while-logged-in.html'));
    }
    else {
        res.sendFile(path_1.default.resolve(__dirname, relativePath, 'homepage-while-logged-out.html'));
    }
});
exports.router.get('/logout', function (req, res) {
    req.session = undefined;
    res.sendFile(path_1.default.resolve(__dirname, relativePath, 'login.html'));
});
exports.router.get('/protected', function (req, res) {
    if (req.session && req.session.isLoggedIn) {
        res.sendFile(path_1.default.resolve(__dirname, relativePath, 'protected-page-while-logged-in.html'));
    }
    else {
        res.sendFile(path_1.default.resolve(__dirname, relativePath, 'protected-page-while-logged-out.html'));
    }
});
var areCredsValid = function (email, password) {
    if (email && password && email === validEmail && password === validPassword) {
        return true;
    }
    return false;
};
