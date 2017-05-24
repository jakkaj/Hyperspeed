
import { serviceBase } from "./serviceBase";
import { IConfigService } from "../contract/contracts";

export class configService extends serviceBase implements IConfigService {
    private _config:config;
    constructor() {
        super();
        
        this._config = {
            ENDPOINT:process.env.ENDPOINT,
            PRIMARYKEY:process.env.PRIMARYKEY, 
            DATABASE:process.env.DATABASE,
            COLLECTION: process.env.COLLECTION
        };
    }

    public get config():config{
        return this._config;
    }
}