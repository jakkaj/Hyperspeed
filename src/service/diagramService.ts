import * as fs from 'fs';
import  * as viz from 'viz.js';
import { configBase } from "./serviceBase";
import { IDiagramService } from "../contract/contracts";
import { dotBuilder, node, edge, connection } from "../dot/dotBuilder";

class diagramService extends configBase implements IDiagramService {

    private _dotBuilder:dotBuilder;
    
    constructor() {
        super();        
    }

    createDiagramFromString(json:string):string{
        var obj = JSON.parse(json);
        return this.createDiagramFromObj(obj);
    }

    createDiagramFromObj(obj:any): string{
        try{
            var nodes:[any[], any[]] = [[], []];
            
            this.walkTree(obj, nodes);

            var vertexNodes = new node("doublecircle", "filled", "lightblue", 
                nodes[0].map((ele) => ele.id)
            );

            var connections:connection[] = [];

            for(var e in nodes[1]){
                var currentEdge = nodes[1][e];

                var c = new connection(currentEdge.outV, currentEdge.inV, currentEdge.label);
                connections.push(c);
            }

            var edges = new edge("bold", null, null, connections);

            var builder = new dotBuilder();
            var builtDot = builder.build([vertexNodes], [edges], "Graph erm... Graph\r\n\r\n\r\nhttps://github.com/jakkaj/funcgraph\r\n\r\n");
            
            var svg = this.buildGraph(builtDot);
            return svg;           
        }catch(e){

        }
    }
    
    buildGraph(dot){
            return viz(dot, { format: "svg", "engine":"neato"});    
    }
    
    walkTree(obj:any, elements:[any[], any[]]){
        
        if(typeof(obj) == "object"){
            if(obj["type"] == "vertex"){
                elements[0].push(obj);
            }else if(obj["type"] == "edge"){
                elements[1].push(obj);
            }else{
                //traverse
                for (var i in obj) {
                    if (!!obj[i] && typeof(obj[i])=="object") {
                        console.log(i, obj[i])
                        this.walkTree(obj[i], elements);
                    }
                }
            }
        }
    }

    private  _getEdge(obj:any, edges: edge[]){
        var edge = new edge()
    }

    private _getVertex(obj:any, nodes:node[]){

    }
    
}

export {diagramService};