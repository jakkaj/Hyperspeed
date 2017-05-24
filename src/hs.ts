#!/usr/bin/env node

import * as program from "commander";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import gremlinClient from './client/gremlinClient';
import * as contracts from './contract/contracts';

class cli{

    private _argv;
    private _gremlinClient:contracts.IGremlinClient;
    private _logger:contracts.ILocalLogService;
    private _saveFile:string = "";

    async boot(argv: any) {
        
        console.log("Hyperspeed is alpha. Please report issues https://github.com/jakkaj/Hyperspeed/issues")

        this._gremlinClient = new gremlinClient();
        this._logger = this._gremlinClient.logger;
      
        this._argv = argv;
       
        this._process(argv);

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

        this._saveFile = "";
        if(program.save){
            this._saveFile = program.save;
        }

        if(program.query){
           
            await this.query(program.query);
        }   

        if(program.wait){
            return true;
        }

        return false;
    }

    async query(query:string){

        var result = await this._gremlinClient.executeAsync(query);
        var stringResult = JSON.stringify(result);
        
        this._logger.log(stringResult);
        
        if(this._saveFile!=""){
            if(!fs.existsSync(this._saveFile)){
                fs.writeFileSync(this._saveFile, stringResult);
            }else{
                fs.appendFileSync(this._saveFile, '\n' + stringResult);
            }            
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
            .option('-f, --file [queryFile]', 'run queries from a file')
            .option('-s, --save [saveFile]', 'save the results to a file -  will append')
            .option('-w, --wait', 'stay open, wait for more gremlin commands')
            .parse(argv);
    }

}


var c = new cli();

c.boot(process.argv).then((e)=>{
    if(e){   
        console.log('Waiting for more gremlins...')
        process.stdin.resume();
        process.stdin.on('data', (k)=>{
            
            var input = k.toString();             

            try{                                 
                c.query(input);
            }catch(e){
                console.log(`[Problem] ${e}`);
            }            
        });    
    }
    else{
        process.exit(0);
    }
});


