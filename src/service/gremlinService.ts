import { injectable, inject } from 'inversify';
import * as gremlin from 'gremlin-secure';

import { configBase } from "./serviceBase";
import * as contracts from "../contract/contracts";


@injectable()
export class gremlinService extends configBase implements contracts.IGremlinService{
  
    private _config: config;
    private _client:any = null;
    
    constructor() {
        super();        
    }
    
    private init(){

        if(this._client!=null){
            return;
        }

        if(this._config==null){
            this._config = this.configService.config;
        }        
        
        //TODO: validate there are configs present. 
        if(!this._config.endpoint || this._config.endpoint.length == 0){

        }

        var cfg = { 
            "session": false, 
            "ssl": true, 
            "user": `/dbs/${this._config.database}/colls/${this._config.collection}`,
            "password": this._config.primayKey
        };

        this._client = gremlin.createClient(
            443, 
            this._config.endpoint,
            cfg 
        );
  }
  public setConfig(config:config){
      this._config = config;
  }

  public async executeAsync(query:string):Promise<any>{
      this.init();
      
      return new Promise<any>((good, bad)=>{
        this._client.execute(query, { }, (err, results) => {
              
              if (err) {
                this.logger.logError(`[DB Error] -> ${err}`)
                bad(err);
                return;
              }              
              good(results);              
         });  
      });         
  }
}