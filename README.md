# Hyperspeed

A command line tool and Node library for working with Cosmos DB. 

This is a work in progress. Please create [issues](https://github.com/jakkaj/Hyperspeed/issues) if you find bugs / things that could be better. 

![hyperspeed](https://cloud.githubusercontent.com/assets/5225782/26386076/816e855c-4087-11e7-9c1b-740fc56bc116.gif)

## In Node.js apps

Create a .env file in the root of your node app that looks like this:

ENDPOINT=yourdb.graphs.azure.com

PRIMARYKEY=yourkey

DATABASE=graphdb

COLLECTION=somegraphcollection


```javascript
var hyperspeed = require('hyperspeed');

require('dotenv').config();
var conf = {
    'database':process.env.DATABASE,
    'collection':process.env.COLLECTION,
    'endpoint':process.env.ENDPOINT,
    'primayKey':process.env.PRIMARYKEY
};

var s = new hyperspeed(conf);

s.executeAsync('g.V().count()').then((result)=>{
    console.log(JSON.stringify(result));
    process.exit(1);
})
```

## From the command prompt

You can use the CLI to run queries. 

To get started, type ```hs --init```. This will create a .env and sample query file to use. Enter your Cosmos settings in the .env file. 

If you use the -w option the app will keep the connection open and allow you to enter more queries. You can append to a file with ```-s```. 

I'm still working on the ```-f``` option to run queries from a file. 

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

 
