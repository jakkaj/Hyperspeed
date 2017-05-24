"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const gremlin = require("gremlin-secure");
const serviceBase_1 = require("./serviceBase");
let gremlinService = class gremlinService extends serviceBase_1.configBase {
    constructor() {
        super();
        this._client = null;
    }
    init() {
        if (this._client != null) {
            return;
        }
        if (!this._config == null) {
            this._config = this.configService.config;
        }
        //TODO: validate there are configs present. 
        if (!this._config.endpoint || this._config.endpoint.length == 0) {
        }
        var cfg = {
            "session": false,
            "ssl": true,
            "user": `/dbs/${this._config.database}/colls/${this._config.collection}`,
            "password": this._config.primayKey
        };
        this._client = gremlin.createClient(443, this._config.endpoint, cfg);
    }
    setConfig(config) {
        this._config = config;
    }
    executeAsync(query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.init();
            return new Promise((good, bad) => {
                this._client.execute(query, {}, (err, results) => {
                    if (err) {
                        this.logger.logError(`[DB Error] -> ${err}`);
                        bad(err);
                        return;
                    }
                    good(results);
                });
            });
        });
    }
};
gremlinService = __decorate([
    inversify_1.injectable()
], gremlinService);
exports.gremlinService = gremlinService;
//# sourceMappingURL=gremlinService.js.map