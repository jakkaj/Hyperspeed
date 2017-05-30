"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const viz = require("viz.js");
const serviceBase_1 = require("./serviceBase");
const dotBuilder_1 = require("../dot/dotBuilder");
class diagramService extends serviceBase_1.configBase {
    constructor() {
        super();
    }
    createDiagramFromString(json) {
        var obj = JSON.parse(json);
        return this.createDiagramFromObj(obj);
    }
    createDiagramFromObj(obj) {
        try {
            var nodes = [[], []];
            this.walkTree(obj, nodes);
            var vertexNodes = new dotBuilder_1.node("doublecircle", "filled", "lightblue", nodes[0].map((ele) => ele.id));
            var connections = [];
            for (var e in nodes[1]) {
                var currentEdge = nodes[1][e];
                var c = new dotBuilder_1.connection(currentEdge.outV, currentEdge.inV, currentEdge.label);
                connections.push(c);
            }
            var edges = new dotBuilder_1.edge("bold", null, null, connections);
            var builder = new dotBuilder_1.dotBuilder();
            var builtDot = builder.build([vertexNodes], [edges], "Graph erm... Graph\r\n\r\n\r\nhttps://github.com/jakkaj/funcgraph\r\n\r\n");
            var svg = this.buildGraph(builtDot);
            return svg;
        }
        catch (e) {
        }
    }
    buildGraph(dot) {
        return viz(dot, { format: "svg" });
    }
    walkTree(obj, elements) {
        if (typeof (obj) == "object") {
            if (obj["type"] == "vertex") {
                elements[0].push(obj);
            }
            else if (obj["type"] == "edge") {
                elements[1].push(obj);
            }
            else {
                //traverse
                for (var i in obj) {
                    if (!!obj[i] && typeof (obj[i]) == "object") {
                        console.log(i, obj[i]);
                        this.walkTree(obj[i], elements);
                    }
                }
            }
        }
    }
    _getEdge(obj, edges) {
        var edge = new edge();
    }
    _getVertex(obj, nodes) {
    }
}
exports.diagramService = diagramService;
//# sourceMappingURL=diagramService.js.map