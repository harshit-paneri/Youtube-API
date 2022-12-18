"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    id: String,
    title: String,
    description: String,
    publishedAt: Date,
    thumbnails: {
        default: String,
        medium: String,
        high: String,
    }
});
// 3. Create a Model.
const user = (0, mongoose_1.model)('User', userSchema);
exports.user = user;
