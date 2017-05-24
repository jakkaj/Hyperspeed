"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const contracts = require("../contract/contracts");
const projectGlue_1 = require("../glue/projectGlue");
require('dotenv').config();
let gremlinClient = class gremlinClient {
    constructor() {
        this.glue = new projectGlue_1.glue();
        this.gremlinService =
            this.glue.container.get(contracts.tContracts.IGremlinService);
    }
    get logger() {
        return this.gremlinService.logger;
    }
};
gremlinClient = __decorate([
    inversify_1.injectable()
], gremlinClient);
exports.default = gremlinClient;
//# sourceMappingURL=gremlinClient.js.map