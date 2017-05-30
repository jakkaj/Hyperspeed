interface config{
    endpoint:string, 
    primayKey:string,
    database:string,
    collection:string
}

interface graphOptions{
    saveFile?:string,
    diagramFile?:string
}

export {config, graphOptions};