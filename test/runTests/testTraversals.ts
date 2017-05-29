import test from 'ava';
import * as dotenv from 'dotenv';

dotenv.config();

import * as contracts from '../../src/contract/contracts';
import gremlinClient from '../../src/client/gremlinClient';

var c = new gremlinClient();

test('someTest', async t=>{
    var g = await c.executeAsync("g.V().count()");
    console.log("testing 123");
    t.pass();    
});