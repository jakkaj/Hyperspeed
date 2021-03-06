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
            console.log("Hyperspeed is alpha. Please report issues https://github.com/jakkaj/Hyperspeed/issues");
            this._gremlinClient = new gremlinClient_1.default();
            this._logger = this._gremlinClient.logger;
            this._argv = argv;
            this._process(argv);
            this._options = {};
            if (argv.length === 2) {
                this._help();
                return;
            }
            if (program.init) {
                this._init();
            }
            if (program.config) {
                if (!fs.existsSync(program.config)) {
                    this._logger.logWarning(`Could not find ${program.config}. Trying default .env`);
                    this._defaultEnv();
                }
                else {
                    dotenv.config({ path: program.config });
                }
            }
            else {
                this._defaultEnv();
            }
            if (program.save) {
                this._options.saveFile = program.save;
            }
            if (program.diagram) {
                this._options.diagramFile = program.diagram;
            }
            if (program.file) {
                yield this._gremlinClient.executeFileAsync(program.file, this._options);
            }
            if (program.query) {
                yield this._gremlinClient.executeLinesAsync(program.query, this._options);
            }
            if (program.wait) {
                yield this._gremlinClient.init();
                return true;
            }
            return false;
        });
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this._gremlinClient.executeLinesAsync(query, this._options);
            var stringResult = JSON.stringify(result);
            if (stringResult) {
                this._logger.log(stringResult);
            }
        });
    }
    _help() {
        program.help();
    }
    _defaultEnv() {
        if (!fs.existsSync('./.env')) {
            this._logger.logError("Could not find a config file. Try --init first.");
        }
        else {
            this._logger.logGood('[Default .env]');
            dotenv.config();
        }
    }
    _init() {
        var dir = path.join(__dirname, '../', 'template');
        fs.readdirSync(dir).forEach(file => {
            var fn = path.join(dir, file);
            if (fs.existsSync(file)) {
                this._logger.logWarning(`Skipping init existing file ${fn}`);
                return;
            }
            fs.createReadStream(fn).pipe(fs.createWriteStream(file));
            this._logger.logInfo(file);
        });
    }
    _process(argv) {
        program
            .version("{$version}")
            .option('-c, --config [configPath]', 'config file path')
            .option('-i, --init', 'init a sample config and query source file')
            .option('-q, --query [query]', 'run a gremlin query from the command line')
            .option('-f, --file [queryFile]', 'run queries from a file. Blank line to separate gremlins. #lines for comments. ')
            .option('-s, --save [saveFile]', 'save the results to a file -  will append')
            .option('-w, --wait', 'stay open, wait for more gremlin commands')
            .option('-d, --diagram [diagramFile]', 'create a diagram from a query and save it to the file')
            .parse(argv);
    }
    get processingCommands() {
        return this._gremlinClient.processingCommands;
    }
}
var c = new cli();
c.boot(process.argv).then((e) => {
    if (e) {
        console.log('Waiting for more gremlins...');
        process.stdin.resume();
        process.stdin.on('data', (k) => {
            var input = k.toString();
            c.query(input);
        });
    }
    else {
        setInterval(() => {
            if (!c.processingCommands) {
                process.exit(0);
            }
        }, 500);
    }
});
//# sourceMappingURL=hs.js.map