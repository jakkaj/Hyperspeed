import { injectable, inject } from 'inversify';
import * as gremlin from 'gremlin-secure';
import * as fs from 'fs';
import * as path from 'path';

import { configBase } from "./serviceBase";
import * as contracts from "../contract/contracts";
import { config, graphOptions } from "../contract/entity";


@injectable()
export class gremlinService extends configBase implements contracts.IGremlinService{
  
    private _config: config;
    private _client:any = null;
    private _commandQueue:string[] = [];

    private _diagramService:contracts.IDiagramService;

    public processingCommands: boolean = false;

    constructor(@inject(contracts.tContracts.IDiagramService) diagramService:contracts.IDiagramService) {
        super();        

        this._diagramService = diagramService;
    }
    
    public init(){

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

        this.logger.logInfo('[Init complete]');
  }
    public setConfig(config:config){
        this._config = config;
    }

    public async executeFileAsync(file:string, options:graphOptions):Promise<any>{       
              
        if(!path.isAbsolute(file)){
            file = path.join(process.cwd(), file);
        }

        if(!fs.existsSync(file)){
            this.logger.logError(`[File not found] -> ${file}`);
        }

        var data:string = fs.readFileSync(file, 'utf-8');

        var result = await this.executeLinesAsync(data, options);

        return result;
    }

    public async executeLinesAsync(lines:string, options:graphOptions):Promise<any>{              
       
        var dSplit =lines.split('\n');
        //so the last line will be run - hacky perhaps :/
        dSplit.push('\n');        

        var currentCommand:string = '';

        for(var lineNumber in dSplit){
            
            var line = dSplit[lineNumber];

            line = line.replace('\r', '');

            if(line.startsWith('#')){                
                this._commandQueue.push(line);                
                continue;
            }

            //blank links are the breaks between commands 
            //this way you can have large commands over multiple lines run as a single command
            if (!line || line.length == 0 || /^\s*$/.test(line)){
                
                if(!currentCommand || currentCommand.length == 0 ||/^\s*$/.test(currentCommand)){
                    continue;
                }

                if(currentCommand.length > 0 && !/^\s*$/.test(currentCommand)){
                     this._commandQueue.push(currentCommand);
                }                
                                
                currentCommand = '';
            }else{
                if(currentCommand!=''){
                    currentCommand+='\n';
                }
                currentCommand+=line;
            }
        }

        this._processCommands(options);
    }

    private async _processCommands(options:graphOptions){
        
        if(!options){
            options={};
        }

        if(this.processingCommands){
            return;
        }

        this.processingCommands = true;
        
        while(this._commandQueue.length > 0){
            var currentCommand = this._commandQueue[0];            
            this._commandQueue.shift();

            if(currentCommand.startsWith('#')){
                this.logger.log(currentCommand);
                this.saveFile(currentCommand, options.saveFile);
                continue;
            }

            try{
                var results = await this.executeAsync(currentCommand, options);

                if(results && results.length && results.length > 0){
                    this.logger.log(JSON.stringify(results));
                }
            }catch(e){
                //maybe need to stop executing?
            }
        }

        this.processingCommands = false;
    }

    public async executeAsync(query:string, options:graphOptions):Promise<any>{
        
        if(!options){
            options = {};
        }

        this.init();
        
        if(query.trim().length == 0){
            return;
        }

        return new Promise<any>((good, bad)=>{
            try{
                this._client.execute(query, { }, (err, results) => {
                    
                    if (err) {
                        this.logger.logError(`[DB Error] -> ${err}`)
                        this.saveFile(`#####Error\n${err}\n#####`, options)
                        bad(err);
                        return;
                    }          

                    var json:string = JSON.stringify(results, null, '\t');

                    if(results && results.length && results.length > 0){
                        this.saveFile(json, options);         
                    }  

                    if(options.diagramFile){
                        var svg = this._diagramService.createDiagramFromObj(results);
                        this.saveDiagram(svg, options.diagramFile);
                    }              

                    good(results);              
                });
            }
            catch(e){
                this.logger.logError(`Problem in executeAsync ${e}`);
                bad(e);
            }  
        });         
    }

    private saveDiagram(svg:string, saveFile:string){
        
        if(!path.isAbsolute(saveFile)){
            saveFile = path.join(process.cwd(), saveFile);
        }

        fs.writeFileSync(saveFile, svg);
    }

    private saveFile(results:string, options:graphOptions){
        
        if(!options){
            options = {};
        }

        if(!options.saveFile){
            return;
        }

        var saveFile = options.saveFile;

        if(saveFile && results){           
            if(!fs.existsSync(saveFile)){
                fs.writeFileSync(saveFile, results);
            }else{
                fs.appendFileSync(saveFile, '\n' + results);
            }            
        }
    }
}