"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceBase_1 = require("./serviceBase");
class configService extends serviceBase_1.serviceBase {
    constructor() {
        super();
        this._config = {
            endpoint: process.env.ENDPOINT,
            primaryKey: process.env.primaryKey,
            database: process.env.database,
            collection: process.env.collection
        };
    }
    get config() {
        return this._config;
    }
}
exports.configService = configService;
//# sourceMappingURL=configService.js.map