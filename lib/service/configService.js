"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceBase_1 = require("./serviceBase");
class configService extends serviceBase_1.serviceBase {
    constructor() {
        super();
        this._config = {
            ENDPOINT: process.env.ENDPOINT,
            PRIMARYKEY: process.env.PRIMARYKEY,
            DATABASE: process.env.DATABASE,
            COLLECTION: process.env.COLLECTION
        };
    }
    get config() {
        return this._config;
    }
}
exports.configService = configService;
//# sourceMappingURL=configService.js.map