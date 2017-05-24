#!/usr/bin/env node

import * as program from "commander";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

import gremlinClient from './client/gremlinClient';
import * as contracts from './contract/contracts';

class cli{

    private argv;
    private gremlinClient:contracts.IGremlinClient;
    private logger:contracts.ILocalLogService;

    async boot(argv: any) {
        
        this.gremlinClient = new gremlinClient();
        this.logger = this.gremlinClient.logger;
       
        this.argv = argv;
        this._process(argv);
       
        if(program.config){
            if(!fs.existsSync(program.config)){                
                this.logger.logWarning(`Could not find ${program.config}. Trying default .env`);
                this._defaultEnv();            
            }else{
                dotenv.config({path: program.config});
            }            
        }else{
             this._defaultEnv();     
        }
    }

    private _defaultEnv(){
        if(!fs.existsSync('./.env')){
            this.logger.logError("[Error] -> Could not find a config file. Try --init first.")
        }else{            
            this.logger.logGood('[Default .env]')         
            dotenv.config();
        }    
    }

    private _process(argv){
        program
            .version("{$version}")
            .option('-c, --config [configPath]', 'config file path')
            .option('-i, --init', 'init a sample config and query source file')
            .option('-q, --query [query]', 'run a gremlin query from the command line')
            .option('-f, --file [queryFile]', 'run queries from a file')           
            .parse(argv);
    }

}


var c = new cli();

c.boot(process.argv).then((e)=>{
    if(e){       
    }
    else{

    }
});


