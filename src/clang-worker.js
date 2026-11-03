import { createCompiler } from '@live-codes/clang-wasm';
let compiler=null,compilerLang=null;
self.onmessage=async({data})=>{
 if(data.type!=='run')return;
 try{
  if(!compiler||compilerLang!==data.language){
   if(compiler)compiler.dispose();
   self.postMessage({type:'status',message:'Mengunduh Clang + sysroot (~29 MB)…'});
   compiler=await createCompiler(data.language,{baseUrl:new URL('./clang/',self.location.href),std:data.standard,onProgress:value=>self.postMessage({type:'status',message:'Mengunduh toolchain '+Math.round(value*100)+'%'})});
   compilerLang=data.language;
  }
  self.postMessage({type:'status',message:'Kompilasi dan eksekusi '+data.language.toUpperCase()+'…'});
  const result=await compiler.run(data.code,data.stdin||'',{std:data.standard,compileArgs:['-Wall','-Wextra']});
  self.postMessage({type:'result',output:result.output,errors:result.errors.join('\n'),exitCode:result.exitCode,compileMs:result.compileMs,runMs:result.runMs});
 }catch(error){self.postMessage({type:'error',message:String(error&&error.message||error)});}
};