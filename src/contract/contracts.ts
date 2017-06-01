

import { config, graphOptions } from "./entity";

interface ILocalLogService {
    logError(output:string);
    logWarning(output:string);
    log(output:string);
    logGood(output:string);
    logInfo(output:string);
    logException(output:string);
}

interface IConvertService{
    convertArrayToGremlinVertices(obj:any, vertexLabel:string):string;
    convertObjectToGremlinVertices(obj:any, vertexLabel:string):string;
    convertObjectToGremlinEdges(obj:any, edgeLabel?:string):string;
}

interface IGremlinService{
    init();
    executeAsync(query:string, options:graphOptions):Promise<any>;
    executeLinesAsync(lines:string, options:graphOptions):Promise<any>;
    executeFileAsync(file:string, options:graphOptions):Promise<any>;
    logger:ILocalLogService;
    setConfig(config:config);
    processingCommands:boolean;
}

interface IGremlinClient{
    init();
    logger:ILocalLogService;
    executeAsync(query:string, options:graphOptions):Promise<any>;
    executeLinesAsync(lines:string, options:graphOptions):Promise<any>;
    executeFileAsync(file:string, options:graphOptions):Promise<any>;
    processingCommands:boolean;
    createDiagramFromString(json:string): string;
    convertObjectToGremlinVertices(obj:any, vertexLabel:string):string;
    convertObjectToGremlinEdges(obj:any, edgeLabel?:string):string;
}

interface IConfigService{
    config:config;
}

interface IDiagramService{
    createDiagramFromString(json:string): string;
    createDiagramFromObj(obj:any): string;
}

let tContracts = {
    ILocalLogService: Symbol("ILocalLogService"), 
    IConfigService: Symbol("IConfigService") , 
    IGremlinClient: Symbol("IGremlinClient"),
    IGremlinService: Symbol("IGremlinService"), 
    IConvertService : Symbol("IConvertService"),
    IDiagramService: Symbol("IDiagramService")
}

export {tContracts, ILocalLogService, IConfigService, 
    IGremlinClient, IGremlinService, IConvertService,
    IDiagramService};