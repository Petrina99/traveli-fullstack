"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// express.json() and express.urlencoded() for parsing body of a request as json
// we get {"username": "John"} instead of {}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/api/posts', routes_1.postRouter);
app.use('/api/users', routes_1.userRouter);
app.use('/api/comments', routes_1.commentRouter);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
