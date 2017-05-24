# Hyperspeed

A command line tool and Node library for working with Cosmos DB. 

This is a WIP.

```javascript
var hyperspeed = require('hyperspeed');
```



## CLI

Usage: hs [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -c, --config [configPath]  config file path
    -i, --init                 init a sample config and query source file
    -q, --query [query]        run a gremlin query from the command line
    -f, --file [queryFile]     run queries from a file
    -s, --save [saveFile]      save the results to a file -  will append
    -w, --wait                 stay open, wait for more gremlin commands

Async and TypeScript compatible Cosmos DB graph client. Includes CLI tool. 
