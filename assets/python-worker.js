let runtimePromise=null,py=null;
self.onmessage=async({data})=>{
 if(data.type!=='run')return;
 try{
  if(!runtimePromise){
   self.postMessage({type:'loading',message:'Mengunduh runtime Pyodide…'});
   importScripts('https://cdn.jsdelivr.net/pyodide/v0.29.5/full/pyodide.js');
   runtimePromise=loadPyodide({stdout:text=>self.postMessage({type:'stdout',text}),stderr:text=>self.postMessage({type:'stdout',text})});
  }
  py=py||await runtimePromise;
  self.postMessage({type:'ready',version:'Python '+py.runPython('import sys; sys.version.split()[0]')+' · Pyodide 0.29.5'});
  if(data.code.includes('import numpy')||data.code.includes('from numpy')){
   self.postMessage({type:'loading',message:'Memuat paket NumPy…'});
   await py.loadPackage('numpy');
  }
  await py.runPythonAsync(data.code);
  self.postMessage({type:'done'});
 }catch(error){self.postMessage({type:'error',message:String(error&&error.message||error)});}
};