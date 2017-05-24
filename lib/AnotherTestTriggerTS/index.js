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
const projectGlue_1 = require("../glue/projectGlue");
const contracts = require("../contract/contracts");
var g = new projectGlue_1.glueBase();
const dotenv = require("dotenv");
dotenv.config();
var gremlin = g.glue.container.get(contracts.tContracts.IGremlinClient);
var config = g.glue.container.get(contracts.tContracts.IConfigService);
class runner {
    doRun(context) {
        return __awaiter(this, void 0, void 0, function* () {
            var g = yield gremlin.executeAsync('g.V().count()');
            var js = JSON.stringify(g);
            context.log(js);
            context.done();
        });
    }
}
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var r = new runner();
    r.doRun(context);
    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "G'Day " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};
//# sourceMappingURL=index.js.map