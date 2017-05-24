import "reflect-metadata";
import { gremlinService } from './../service/gremlinService';
import { injectable } from 'inversify';

import { serviceBase, configBase } from "../service/serviceBase";
import * as contracts from "../contract/contracts";
import { glue } from "../glue/projectGlue";

require('dotenv').config();

@injectable()
export default class gremlinClient implements contracts.IGremlinClient{  
  
  private glue:glue;

  private gremlinService:contracts.IGremlinService;
  
  get logger():contracts.ILocalLogService{
    return this.gremlinService.logger;
  }

  constructor() {
    this.glue = new glue();
    this.gremlinService = 
      this.glue.container.get<contracts.IGremlinService>(contracts.tContracts.IGremlinService);
    
  }

}


