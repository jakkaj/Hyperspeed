import { configService } from './configService';
import { IConvertService } from "../contract/contracts";

class convertService extends configService implements IConvertService{
    
    public convertObjectToGremlinEdges(obj:any, edgeLabel?:string):string{
        
        var inV:string = null;
        var outV:string = null;     


        if(!edgeLabel && obj.label){
            edgeLabel = obj.label;
            obj.label = null;
        } 

        if(!edgeLabel){
            this.logger.logError(`edgeLabel not passed in and label property not set on ${JSON.stringify(obj)}`);
            return null;
        }

        if(!obj.inVLabel){
            this.logger.logError(`inVLabel property not set on ${JSON.stringify(obj)}`);
            return null;
        }else{
            inV = obj.inVLabel;
            obj.inVLabel = null;
        }

         if(!obj.outVLabel){
            this.logger.logError(`outVLabel property not set on ${JSON.stringify(obj)}`);
            return null;
        } else{
            outV = obj.outVLabel;
            obj.outVLabel = null;
        }
        
        var properties = '';

        for(var i in obj){
            var p = obj[i];
            if(p){
                properties += `.property('${i}', '${p}')`;
            }
            
        }

        var gremlin = `g.V('${outV}').addE('${edgeLabel}')${properties}.to(g.V('${inV}'))`;

        return gremlin;
    }

    public convertArrayToGremlinVertices(obj:any, vertexType?:string):string{
        var gremlin = '';
        for(var i in obj){
            gremlin += this.convertObjectToGremlinVertices(obj[i], vertexType);
        }

        return gremlin;
    }

    public convertObjectToGremlinVertices(obj:any, vertexType?:string):string{
        
        if(obj instanceof Array){
            return this.convertArrayToGremlinVertices(obj, vertexType);
        }       

        if(!vertexType && obj.label){
            vertexType = obj.label;
        }

        var gremlin = `g.addV('${vertexType}')`;

        if(obj.properties){
            obj = obj.properties;
        }

        for(var i in obj){
            var p = obj[i];

            if(p instanceof Array){
                //this var is a prop
                for(var iProp in p){
                    var iPropVal = p[iProp];
                    
                    if(iPropVal.value){
                        iPropVal = iPropVal.value;
                    }

                    gremlin+= `.property('${i}', '${iPropVal}')`;
                }
            }else{
                if(p.value){
                    p = p.value;
                }
                gremlin+= `.property('${i}', '${p}')`;
            }            
        }

        gremlin += "\r\n\r\n";

        return gremlin;
    }
    
}

export {convertService};