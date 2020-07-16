/*eslint-disable @typescript-eslint/no-var-requires*/
// This script will compile *.proto file in src/types/vNerveTransmitter to both JS and TS module
const pbjs = require("protobufjs/cli/pbjs"), pbts = require('protobufjs/cli/pbts');
const fs = require('fs'), glob = require('glob');
const dir = 'src/types/vNerveTransmitter/';

// Check if dir exist
try {
  fs.readdirSync(dir);
}catch (e) {
  if(e.code === 'ENOENT'){
    console.error('Fetching Directory Failed! Did you sync all submodules?');
  }else{
    console.error('Unknown Error:' + e);
  }
  process.exit(-1);
}

//Grab all .proto files
const files = glob.sync(dir + '/**/*.proto');

// Construct Args.
const pbjsArgs = ['-t','static-module', '-w', 'commonjs', '--no-beautify', '--no-create',
  '--no-encode', '--no-convert', '--no-verify', '--no-delimited', '-o', 'src/types/vNerveTransmitter/index.js',
  ...files];
const pbtsArgs = ['-o', 'src/types/vNerveTransmitter/index.d.ts', '--no-comments',
  'src/types/vNerveTransmitter/index.js'];

// Compile
console.log('Compiling ProtoBuf to JavaScript...');
pbjs.main(pbjsArgs, (pbjsErr,pbjsOut) =>{
  if(pbjsErr){
    console.error('Errored while compiling ProtoBuf to JavaScript: ' + pbjsErr);
    process.exit(-1);
  }else{
    console.log('Compiled ProtoBuf to JavaScript, output length: ' + pbjsOut.length);
    console.log('Compiling JavaScript PB to TS Namespace...');
    pbts.main(pbtsArgs,(pbtsErr,pbtsOut)=>{ // wip: This is bad. Callback hell is bad.
      if(pbtsErr){
        console.error('Errored while compiling JavaScript PB to TS Namespace: ' + pbtsErr);
        process.exit(-1);
      }else{
        console.log('Compiled JavaScript PB to TS Namespace, output length: ' + pbtsOut.length);
        console.log('Success!');
        process.exit(0);
      }
    });
  }
});
