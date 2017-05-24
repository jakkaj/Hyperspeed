"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gremlinService_1 = require("./../service/gremlinService");
require("reflect-metadata");
const inversify_1 = require("inversify");
const contracts = require("../contract/contracts");
const configService_1 = require("../service/configService");
const localLogService_1 = require("../service/localLogService");
class glue {
    constructor() {
        this.container = new inversify_1.Container();
        this.container.bind(contracts.tContracts.IConfigService).
            to(configService_1.configService).inSingletonScope();
        this.container.bind(contracts.tContracts.ILocalLogService).
            to(localLogService_1.localLogService).inSingletonScope();
        this.container.bind(contracts.tContracts.IGremlinService).
            to(gremlinService_1.gremlinService).inSingletonScope();
    }
}
exports.glue = glue;
//# sourceMappingURL=projectGlue.js.map