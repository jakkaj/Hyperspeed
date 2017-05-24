
import { serviceBase } from "./serviceBase";
import { IConfigService } from "../contract/contracts";

export class configService extends serviceBase implements IConfigService {
    private _config:config;
    constructor() {
        super();
        
        this._config = {
            endpoint:process.env.ENDPOINT,
            primaryKey:process.env.primaryKey, 
            database:process.env.database,
            collection: process.env.collection
        };
    }

    public get config():config{
        return this._config;
    }
}