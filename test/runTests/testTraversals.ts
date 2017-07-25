//import test from 'ava';
import * as dotenv from 'dotenv';
import * as fs from 'fs';



dotenv.config();

import * as contracts from '../../src/contract/contracts';
import gremlinClient from '../../src/client/gremlinClient';
import {graphOptions} from '../../src/contract/entity';

class runner{
    /**
     *
     */


    private c: gremlinClient;
    constructor() {
       
        this.c = new gremlinClient();
    }

    async runEdgeConverter(){
        var obj = {
            inVLabel:"Jordan",
            outVLabel:"Mary", 
            label:"Knows",
            someProperty: "Some property is cool"
        }

        var result = this.c.convertObjectToGremlinEdges(obj);
    }

    async runTestConverter(){
        var inJson = fs.readFileSync('test/dataData/testConvertVertex.json', 'utf-8');
        var obj = JSON.parse(inJson);
        var result = this.c.convertObjectToGremlinVertices(obj, 'person');
        var r = result;
    }

    async run(){
            
        var inJson = fs.readFileSync('test/dataData/generatedPeople.json', 'utf-8');
        var inParsed = JSON.parse(inJson);
        var gremlinLines = 'g.V().drop()\r\n\r\n';        

        for(var i in inParsed){
            
            var s:string = "g.addV('person').property('repo', 'skdjfldl')";
            var objIn = inParsed[i];
            
            s+= `.property('id', '${objIn.name}')`;

            gremlinLines += s + '\r\n\r\n';

            var random = Math.floor(Math.random() * inParsed.length);

            var randomObj = inParsed[random];

            var fromId = randomObj['name'];
            var toId = objIn['name'];
            var edgeString = `g.V('${fromId}').addE('knows').to(g.V('${toId}'))`;
            gremlinLines += edgeString + '\r\n\r\n';

            random = Math.floor(Math.random() * inParsed.length);
            randomObj = inParsed[random];

            fromId = randomObj['name'];
            toId = objIn['name'];
            edgeString = `g.V('${toId}').addE('knows').to(g.V('${fromId}'))`;
            gremlinLines += edgeString + '\r\n\r\n';
        }     

        await this.c.executeLinesAsync(gremlinLines, {});      
        
        var config:graphOptions = {
            diagramFile: "C:\\Users\\jakka\\demo\\hyper\\testDiagram.svg"
        }

        await this.c.executeAsync("g.V().inE()", config);
    }
}

var r = new runner();

r.run();
