"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const const_1 = require("../const");
class UserController {
}
_a = UserController;
/**
 * POST: /
 */
UserController.post = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { password } = _b, restUser = __rest(_b, ["password"]);
    const hash = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
    const user = new User_1.default(Object.assign(Object.assign({}, restUser), { hash }));
    const data = yield user.save();
    res.status(201).json({
        message: "User created successfully",
        data,
    });
}));
/**
 * GET: /
 */
UserController.get = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find().sort({ role: "asc", last_name: "asc" });
    res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
    });
}));
/**
 * GET: /:id
 */
UserController.getId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield User_1.default.findById(id);
    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }
    const _c = user.toJSON(), { hash } = _c, _user = __rest(_c, ["hash"]);
    res.status(200).json({
        message: "User found",
        data: _user,
    });
}));
/**
 * POST: /login
 */
UserController.postLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({
        email,
    });
    if (!user) {
        res.status(404).json({
            message: const_1.USER_NOT_FOUND,
        });
        return;
    }
    const { hash } = user;
    const passwordCorrect = bcrypt_1.default.compareSync(password, hash);
    if (!passwordCorrect) {
        res.status(404).json({
            message: const_1.USER_NOT_FOUND,
        });
        return;
    }
    const _d = user.toJSON(), { hash: h } = _d, userInfo = __rest(_d, ["hash"]);
    res.status(200).json({
        message: "User logged successfully",
        data: userInfo,
    });
}));
exports.default = UserController;
