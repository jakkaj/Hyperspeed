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
const fs = require("fs");
const path = require("path");
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
        if (this._config == null) {
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
    executeFileAsync(file, saveFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path.isAbsolute(file)) {
                file = path.join(process.cwd(), file);
            }
            if (!fs.existsSync(file)) {
                this.logger.logError(`[File not found] -> ${file}`);
            }
            var data = fs.readFileSync(file, 'utf-8');
            var result = yield this.executeLinesAsync(data, saveFile);
            return result;
        });
    }
    executeLinesAsync(lines, saveFile) {
        return __awaiter(this, void 0, void 0, function* () {
            var dSplit = lines.split('\n');
            var commands = [];
            var currentCommand = '';
            for (var lineNumber in dSplit) {
                var line = dSplit[lineNumber];
                line = line.replace('\r', '');
                if (line.startsWith('#')) {
                    this.saveFile(line, saveFile);
                    this.logger.logInfo(line);
                    continue;
                }
                //blank links are the breaks between commands
                if (!line || line.length == 0 || /^\s*$/.test(line)) {
                    if (currentCommand.length > 0 && !/^\s*$/.test(currentCommand)) {
                        commands.push(currentCommand);
                    }
                    try {
                        var results = yield this.executeAsync(currentCommand, saveFile);
                        if (results && results.length && results.length > 0) {
                            this.logger.log(JSON.stringify(results));
                        }
                    }
                    catch (e) {
                        //maybe need to stop executing?
                    }
                    currentCommand = '';
                }
                else {
                    if (currentCommand != '') {
                        currentCommand += '\n';
                    }
                    currentCommand += line;
                }
            }
        });
    }
    executeAsync(query, saveFile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.init();
            return new Promise((good, bad) => {
                this._client.execute(query, {}, (err, results) => {
                    if (err) {
                        this.logger.logError(`[DB Error] -> ${err}`);
                        this.saveFile(`#####Error\n${err}\n#####`, saveFile);
                        bad(err);
                        return;
                    }
                    if (results && results.length && results.length > 0) {
                        this.saveFile(JSON.stringify(results), saveFile);
                    }
                    good(results);
                });
            });
        });
    }
    saveFile(results, saveFile) {
        if (saveFile && results) {
            if (!fs.existsSync(saveFile)) {
                fs.writeFileSync(saveFile, results);
            }
            else {
                fs.appendFileSync(saveFile, '\n' + results);
            }
        }
    }
};
gremlinService = __decorate([
    inversify_1.injectable()
], gremlinService);
exports.gremlinService = gremlinService;
//# sourceMappingURL=gremlinService.js.map