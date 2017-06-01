import "reflect-metadata";
import { gremlinService } from './../service/gremlinService';
import { injectable } from 'inversify';

import { serviceBase, configBase } from "../service/serviceBase";
import * as contracts from "../contract/contracts";
import { glue } from "../glue/projectGlue";
import {config, graphOptions} from '../contract/entity';

require('dotenv').config();

@injectable()
export default class gremlinClient implements contracts.IGremlinClient{  
  
  private _glue:glue;

  private _gremlinService:contracts.IGremlinService;
  private _diagramService:contracts.IDiagramService;
  private _convertService:contracts.IConvertService;

  get logger():contracts.ILocalLogService{
    return this._gremlinService.logger;
  }

  constructor(config?:config) {
    this._glue = new glue();
    
    this._gremlinService = 
      this._glue.container.get<contracts.IGremlinService>(contracts.tContracts.IGremlinService);

    this._diagramService = 
      this._glue.container.get<contracts.IDiagramService>(contracts.tContracts.IDiagramService);

    this._convertService = 
      this._glue.container.get<contracts.IConvertService>(contracts.tContracts.IConvertService);

    if(config){
      this._gremlinService.setConfig(config);
    }    
  }

  convertObjectToGremlinVertices(obj:any, vertexType:string):string{
     return this._convertService.convertObjectToGremlinVertices(obj, vertexType);
  }

  createDiagramFromString(json:string):string {
      return this._diagramService.createDiagramFromString(json);
  }

  createDiagramFromObj(obj:any):string {
      return this._diagramService.createDiagramFromString(obj);
  }

  async executeFileAsync(file:string, options:graphOptions):Promise<any>{
    var result = await this._gremlinService.executeFileAsync(file, options);
    return result;
  }

  async executeLinesAsync(lines:string, options:graphOptions):Promise<any>{
    var result = await this._gremlinService.executeLinesAsync(lines, options);
    return result;
  }

  async executeAsync(query:string, options:graphOptions):Promise<any>{
    var result = await this._gremlinService.executeAsync(query, options);
    return result;
  }

  init(){
    this._gremlinService.init();
  }

  get processingCommands():boolean{
    return this._gremlinService.processingCommands;
  }

}


