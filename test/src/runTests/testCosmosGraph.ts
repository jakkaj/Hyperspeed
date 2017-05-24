import test from 'ava';
import * as dotenv from 'dotenv';

dotenv.config();

console.log("testing 123");

test('test', t=>{
    console.log("hi");
    t.pass();
})