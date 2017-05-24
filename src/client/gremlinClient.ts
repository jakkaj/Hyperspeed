import "reflect-metadata";
import { gremlinService } from './../service/gremlinService';
import { injectable } from 'inversify';

import { serviceBase, configBase } from "../service/serviceBase";
import * as contracts from "../contract/contracts";
import { glue } from "../glue/projectGlue";

require('dotenv').config();

@injectable()
export default class gremlinClient implements contracts.IGremlinClient{  
  
  private _glue:glue;

  private _gremlinService:contracts.IGremlinService;
  
  get logger():contracts.ILocalLogService{
    return this._gremlinService.logger;
  }

  constructor() {
    this._glue = new glue();
    
    this._gremlinService = 
      this._glue.container.get<contracts.IGremlinService>(contracts.tContracts.IGremlinService);    
  }

  async executeAsync(query:string):Promise<any>{
    var result = await this._gremlinService.executeAsync(query);
    return result;
  }

}


