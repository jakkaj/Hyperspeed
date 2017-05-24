interface ILocalLogService{
    logError(output:string);
    logWarning(output:string);
    log(output:string);
    logGood(output:string);
    logInfo(output:string);
    logException(output:string);
}

interface IGremlinService{
    init();
    logger:ILocalLogService;
}

interface IGremlinClient{
   
    logger:ILocalLogService;
}

interface IConfigService{
    config:config;
}

let tContracts = {
    ILocalLogService: Symbol("ILocalLogService"), 
    IConfigService: Symbol("IConfigService") , 
    IGremlinClient: Symbol("IGremlinClient"),
    IGremlinService: Symbol("IGremlinService")
}

export {tContracts, ILocalLogService, IConfigService, IGremlinClient, IGremlinService};