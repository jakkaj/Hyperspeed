#!/usr/bin/env node

import * as program from "commander";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import gremlinClient from './client/gremlinClient';
import * as contracts from './contract/contracts';
import { graphOptions } from "./contract/entity";

class cli{

    private _argv;
    private _gremlinClient:contracts.IGremlinClient;
    private _logger:contracts.ILocalLogService;    
    private _options:graphOptions;

    async boot(argv: any) {
        
        console.log("Hyperspeed is alpha. Please report issues https://github.com/jakkaj/Hyperspeed/issues")

        this._gremlinClient = new gremlinClient();
        this._logger = this._gremlinClient.logger;
      
        this._argv = argv;
       
        this._process(argv);
        

        this._options = {};

        if (argv.length === 2) {
            this._help();
            return;
        }     
       
        if(program.init){
            this._init();
        }

        if(program.config){
            if(!fs.existsSync(program.config)){                
                this._logger.logWarning(`Could not find ${program.config}. Trying default .env`);
                this._defaultEnv();            
            }else{
                dotenv.config({path: program.config});
            }            
        }else{
             this._defaultEnv();     
        }           

        if(program.save){            
            this._options.saveFile = program.save;
        }

        if(program.diagram){
            this._options.diagramFile = program.diagram;
        }

        if(program.file){            
            await this._gremlinClient.executeFileAsync(program.file, this._options);
        }

        if(program.query){           
            await this._gremlinClient.executeLinesAsync(program.query, this._options);
        }   

        if(program.wait){
            await this._gremlinClient.init();
            return true;
        }   

        return false;
    }

    async query(query:string){      
       
        var result = await this._gremlinClient.executeLinesAsync(query, this._options);
        
        var stringResult = JSON.stringify(result);
        
        if(stringResult){
            this._logger.log(stringResult);
        }
        
    }

    private _help(){
        program.help();
    }

    private _defaultEnv(){
        if(!fs.existsSync('./.env')){
            this._logger.logError("Could not find a config file. Try --init first.")
        }else{            
            this._logger.logGood('[Default .env]')         
            dotenv.config();
        }    
    }

    private _init(){
        var dir = path.join(__dirname, '../', 'template');
        
        fs.readdirSync(dir).forEach(file => {
            var fn = path.join(dir, file);
            
            if(fs.existsSync(file)){
                this._logger.logWarning(`Skipping init existing file ${fn}`);
                return;
            }
            
            fs.createReadStream(fn).pipe(fs.createWriteStream(file));
            this._logger.logInfo(file);
        });
    }

    private _process(argv){
        program
            .version("{$version}")
            .option('-c, --config [configPath]', 'config file path')
            .option('-i, --init', 'init a sample config and query source file')
            .option('-q, --query [query]', 'run a gremlin query from the command line')
            .option('-f, --file [queryFile]', 'run queries from a file. Blank line to separate gremlins. #lines for comments. ')
            .option('-s, --save [saveFile]', 'save the results to a file -  will append')
            .option('-w, --wait', 'stay open, wait for more gremlin commands')
            .option('-d, --diagram [diagramFile]', 'create a diagram from a query and save it to the file')
            .parse(argv);
    }

    get processingCommands():boolean{
        return this._gremlinClient.processingCommands;
    }

}


var c = new cli();

c.boot(process.argv).then((e)=>{
    if(e){   
        console.log('Waiting for more gremlins...')
        process.stdin.resume();      
        

        process.stdin.on('data', (k)=>{
            
            var input = k.toString();   
            c.query(input);

        });    
    }
    else{
        setInterval(()=>{
            if(!c.processingCommands){
                process.exit(0);
            }            
        }, 500);
    }
});


