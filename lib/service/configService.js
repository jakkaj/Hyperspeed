"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceBase_1 = require("./serviceBase");
class configService extends serviceBase_1.serviceBase {
    constructor() {
        super();
        this._config = {
            endpoint: process.env.ENDPOINT,
            primayKey: process.env.PRIMARYKEY,
            database: process.env.DATABASE,
            collection: process.env.COLLECTION
        };
    }
    get config() {
        return this._config;
    }
}
exports.configService = configService;
//# sourceMappingURL=configService.js.map