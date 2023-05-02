"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
// Creating app and loading .env
const app = (0, express_1.default)();
dotenv_1.default.config();
// Loading middlewares
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
if (process.env.ENVIRONMENT == "DEV") {
    app.use((0, morgan_1.default)("dev"));
}
// Loading routes
const path = `${(_a = require.main) === null || _a === void 0 ? void 0 : _a.path}\\routes`;
fs_1.default.readdirSync(path).forEach((file) => {
    try {
        const fileNameWithoutExtension = file.replace(".js", "");
        app.use(`/${fileNameWithoutExtension}`, require(`./routes/${file}`));
    }
    catch (error) {
        console.error(error);
    }
});
// Error handler
app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
    });
});
// Loading mongoose
mongoose_1.default.connect(process.env.DATABASE_URL);
const db = mongoose_1.default.connection;
db.on("error", (error) => console.error(error));
db.once("connected", () => console.log("Database connected"));
// Listening port
app.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT}`));
