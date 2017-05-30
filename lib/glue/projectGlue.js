"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gremlinService_1 = require("./../service/gremlinService");
require("reflect-metadata");
const inversify_1 = require("inversify");
const contracts = require("../contract/contracts");
const configService_1 = require("../service/configService");
const localLogService_1 = require("../service/localLogService");
const diagramService_1 = require("../service/diagramService");
const convertService_1 = require("../service/convertService");
class glue {
    constructor() {
        this.container = new inversify_1.Container();
        this.container.bind(contracts.tContracts.IConfigService).
            to(configService_1.configService).inSingletonScope();
        this.container.bind(contracts.tContracts.ILocalLogService).
            to(localLogService_1.localLogService).inSingletonScope();
        this.container.bind(contracts.tContracts.IGremlinService).
            to(gremlinService_1.gremlinService).inSingletonScope();
        this.container.bind(contracts.tContracts.IDiagramService).
            to(diagramService_1.diagramService).inSingletonScope();
        this.container.bind(contracts.tContracts.IConvertService).
            to(convertService_1.convertService).inSingletonScope();
    }
}
exports.glue = glue;
//# sourceMappingURL=projectGlue.js.map