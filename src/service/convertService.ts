import { configService } from './configService';
import { IConvertService } from "../contract/contracts";

class convertService extends configService implements IConvertService{
    
    public convertObjectToE

    public convertArrayToGremlinVertices(obj:any, vertexType:string):string{
        var gremlin = '';
        for(var i in obj){
            gremlin += this.convertObjectToGremlinVertices(obj[i], vertexType);
        }

        return gremlin;
    }

    public convertObjectToGremlinVertices(obj:any, vertexType:string):string{
        
        if(obj instanceof Array){
            return this.convertArrayToGremlinVertices(obj, vertexType);
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