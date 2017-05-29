

import { config } from "./entity";

interface ILocalLogService {
    logError(output:string);
    logWarning(output:string);
    log(output:string);
    logGood(output:string);
    logInfo(output:string);
    logException(output:string);
}

interface IConvertService{

}

interface IGremlinService{
    init();
    executeAsync(query:string):Promise<any>;
    executeLinesAsync(lines:string, saveFile?:string):Promise<any>;
    executeFileAsync(file:string, saveFile?:string):Promise<any>;
    logger:ILocalLogService;
    setConfig(config:config);
    processingCommands:boolean;
}

interface IGremlinClient{
    init();
    logger:ILocalLogService;
    executeAsync(query:string, saveFile?:string):Promise<any>;
    executeLinesAsync(lines:string, saveFile?:string):Promise<any>;
    executeFileAsync(file:string, saveFile?:string):Promise<any>;
    processingCommands:boolean;
    createDiagram(json:string): string;
}

interface IConfigService{
    config:config;
}

interface IDiagramService{
    createDiagram(json:string): string;
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