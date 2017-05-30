"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configService_1 = require("./configService");
class convertService extends configService_1.configService {
    convertArrayToGremlin(obj, vertexType) {
        var gremlin = '';
        for (var i in obj) {
            gremlin += obj[i];
        }
        return gremlin;
    }
    convertObjectToGremlin(obj, vertexType) {
        if (obj instanceof Array) {
            return this.convertArrayToGremlin(obj, vertexType);
        }
        var gremlin = `g.addV('${vertexType}')`;
        for (var i in obj) {
            var p = obj[i];
            if (p instanceof Array) {
                //this var is a prop
                for (var iProp in p) {
                    var iPropVal = p[iProp];
                    if (iPropVal.value) {
                        iPropVal = iPropVal.value;
                    }
                    gremlin += `.property('${iProp}', '${iPropVal}')`;
                }
            }
            else {
                if (p.value) {
                    p = p.value;
                }
                gremlin += `.property('${i}', '${p}')`;
            }
        }
        return gremlin;
    }
}
exports.convertService = convertService;
//# sourceMappingURL=convertService.js.map