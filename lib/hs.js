#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const gremlinClient_1 = require("./client/gremlinClient");
class cli {
    boot(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            this.gremlinClient = new gremlinClient_1.default();
            this.logger = this.gremlinClient.logger;
            this.argv = argv;
            this._process(argv);
            if (program.init) {
                this._init();
            }
            if (program.config) {
                if (!fs.existsSync(program.config)) {
                    this.logger.logWarning(`Could not find ${program.config}. Trying default .env`);
                    this._defaultEnv();
                }
                else {
                    dotenv.config({ path: program.config });
                }
            }
            else {
                this._defaultEnv();
            }
        });
    }
    _defaultEnv() {
        if (!fs.existsSync('./.env')) {
            this.logger.logError("Could not find a config file. Try --init first.");
        }
        else {
            this.logger.logGood('[Default .env]');
            dotenv.config();
        }
    }
    _init() {
        var dir = path.join(__dirname, '../', 'template');
        fs.readdirSync(dir).forEach(file => {
            var fn = path.join(dir, file);
            if (fs.existsSync(file)) {
                this.logger.logWarning(`Skipping init existing file ${fn}`);
                return;
            }
            fs.createReadStream(fn).pipe(fs.createWriteStream(file));
            this.logger.logInfo(file);
        });
    }
    _process(argv) {
        program
            .version("{$version}")
            .option('-c, --config [configPath]', 'config file path')
            .option('-i, --init', 'init a sample config and query source file')
            .option('-q, --query [query]', 'run a gremlin query from the command line')
            .option('-f, --file [queryFile]', 'run queries from a file')
            .parse(argv);
    }
}
var c = new cli();
c.boot(process.argv).then((e) => {
    if (e) {
    }
    else {
    }
});
//# sourceMappingURL=hs.js.map