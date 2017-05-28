interface ILocalLogService{
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
    executeAsync(query:string):Promise<any>;
    executeLinesAsync(lines:string, saveFile?:string):Promise<any>;
    executeFileAsync(file:string, saveFile?:string):Promise<any>;
    logger:ILocalLogService;
    setConfig(config:config);
}

interface IGremlinClient{
   
    logger:ILocalLogService;
    executeAsync(query:string, saveFile?:string):Promise<any>;
    executeLinesAsync(lines:string, saveFile?:string):Promise<any>;
    executeFileAsync(file:string, saveFile?:string):Promise<any>;
}

interface IConfigService{
    config:config;
}

let tContracts = {
    ILocalLogService: Symbol("ILocalLogService"), 
    IConfigService: Symbol("IConfigService") , 
    IGremlinClient: Symbol("IGremlinClient"),
    IGremlinService: Symbol("IGremlinService"), 
    IConvertService : Symbol("IConvertService")
}

export {tContracts, ILocalLogService, IConfigService, 
    IGremlinClient, IGremlinService, IConvertService};