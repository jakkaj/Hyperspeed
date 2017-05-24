import { injectable, inject } from 'inversify';


import { ILocalLogService, tContracts, IConfigService } from "../contract/contracts";


@injectable()
class serviceBase {
    
    @inject(tContracts.ILocalLogService)
    public logger:ILocalLogService;
}

@injectable()
class configBase extends serviceBase {
    
    @inject(tContracts.IConfigService)
    public configService: IConfigService;

    
    //TODO: These get methods should really be on an injected class, for now they are here. 
    
    
}

    

export {serviceBase, configBase};