
import { serviceBase } from "./serviceBase";
import { IConfigService } from "../contract/contracts";
import { config } from "../contract/entity";

export class configService extends serviceBase implements IConfigService {
    private _config:config;
    constructor() {
        super();
        
        this._config = {
            endpoint:process.env.ENDPOINT,
            primayKey:process.env.PRIMARYKEY, 
            database:process.env.DATABASE,
            collection: process.env.COLLECTION
        };
    }

    public get config():config{
        return this._config;
    }
}