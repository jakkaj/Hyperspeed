"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configService_1 = require("./configService");
class convertService extends configService_1.configService {
    convertArrayToGremlinVertices(obj, vertexType) {
        var gremlin = '';
        for (var i in obj) {
            gremlin += this.convertObjectToGremlinVertices(obj[i], vertexType);
        }
        return gremlin;
    }
    convertObjectToGremlinVertices(obj, vertexType) {
        if (obj instanceof Array) {
            return this.convertArrayToGremlinVertices(obj, vertexType);
        }
        var gremlin = `g.addV('${vertexType}')`;
        if (obj.properties) {
            obj = obj.properties;
        }
        for (var i in obj) {
            var p = obj[i];
            if (p instanceof Array) {
                //this var is a prop
                for (var iProp in p) {
                    var iPropVal = p[iProp];
                    if (iPropVal.value) {
                        iPropVal = iPropVal.value;
                    }
                    gremlin += `.property('${i}', '${iPropVal}')`;
                }
            }
            else {
                if (p.value) {
                    p = p.value;
                }
                gremlin += `.property('${i}', '${p}')`;
            }
        }
        gremlin += "\r\n\r\n";
        return gremlin;
    }
}
exports.convertService = convertService;
//# sourceMappingURL=convertService.js.map