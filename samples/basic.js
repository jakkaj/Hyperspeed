var hyperspeed = require('../lib/index');

require('dotenv').config();

//create a .env file that looks like this:

// ENDPOINT=<yourdb>.graphs.azure.com
// PRIMARYKEY=<yourkey>
// DATABASE=graphdb
// COLLECTION=somegraphcollection

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

