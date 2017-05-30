import { gremlinService } from './../service/gremlinService';
import "reflect-metadata";
import { Container } from "inversify"

import * as contracts from '../contract/contracts';
import { configService } from "../service/configService";
import { localLogService } from "../service/localLogService";
import { diagramService } from '../service/diagramService';
import  gremlinClient from "../client/gremlinClient";
import { convertService } from "../service/convertService";

class glue{
    public container:Container;

    constructor(){
        this.container = new Container();

        this.container.bind<contracts.IConfigService>(contracts.tContracts.IConfigService).
             to(configService).inSingletonScope();        

        this.container.bind<contracts.ILocalLogService>(contracts.tContracts.ILocalLogService).
             to(localLogService).inSingletonScope();
             
        this.container.bind<contracts.IGremlinService>(contracts.tContracts.IGremlinService).
             to(gremlinService).inSingletonScope();   

        this.container.bind<contracts.IDiagramService>(contracts.tContracts.IDiagramService).
             to(diagramService).inSingletonScope();  

        this.container.bind<contracts.IConvertService>(contracts.tContracts.IConvertService).
             to(convertService).inSingletonScope(); 
             
    }    
}

export {glue};