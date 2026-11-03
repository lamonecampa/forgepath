import { WasmSharpModule } from '@wasmsharp/core';
const $=id=>document.getElementById(id);
const editor=$('cs-code'), output=$('cs-output'), status=$('cs-status'), runtime=$('cs-runtime');
const initial=editor.value;
const examples={
 hello:initial,
 variables:'using System;\nstring nama = "ForgePath";\nint jumlahModul = 136;\ndouble nilai = 87.5;\nConsole.WriteLine($"Nama: {nama}");\nConsole.WriteLine($"Modul: {jumlahModul}, nilai: {nilai}");',
 loop:'using System;\nint total = 0;\nfor (int i = 1; i <= 10; i++)\n{\n    total += i;\n}\nConsole.WriteLine($"Jumlah 1 sampai 10 = {total}");',
 class:'using System;\nvar akun = new Akun("Dina", 3);\nConsole.WriteLine(akun.Ringkasan());\n\npublic class Akun\n{\n    public string Nama { get; }\n    public int Level { get; }\n    public Akun(string nama, int level) { Nama = nama; Level = level; }\n    public string Ringkasan() => $"{Nama}, level {Level}";\n}'
};
let modulePromise=null,busy=false;
const setBusy=v=>{busy=v;$('cs-run').disabled=v;$('cs-run').textContent=v?'Building…':'▶ Build & Run';};
const initialize=async()=>{
 if(!modulePromise){
  modulePromise=WasmSharpModule.initializeAsync({onDownloadResourceProgress:(loaded,total)=>{status.textContent='Mengunduh runtime '+loaded+'/'+total;runtime.textContent='Loading .NET + Roslyn';}});
 }
 return modulePromise;
};
$('cs-run').addEventListener('click',async()=>{
 if(busy)return;setBusy(true);output.textContent='Menginisialisasi .NET WebAssembly dan Roslyn…';status.textContent='Memuat compiler';
 try{
  const wasm=await initialize();runtime.textContent='.NET 10 + Roslyn';status.textContent='Menyusun kode C#';
  const compilation=await wasm.createCompilationAsync(editor.value);
  const result=await compilation.run();
  if(result.success){output.textContent=result.stdOut||'(Program selesai tanpa output)';if(result.stdErr)output.textContent+='\nSTDERR:\n'+result.stdErr;status.textContent='Build berhasil';}
  else{output.textContent=(result.diagnostics||[]).map(d=>d.id+' · '+d.severity+' · '+d.message+' (posisi '+d.location.start+')').join('\n')||'Kompilasi gagal tanpa diagnostics.';status.textContent='Build gagal';}
 }catch(error){output.textContent='WasmSharp gagal dijalankan:\n'+String(error&&error.stack||error);status.textContent='Runtime error';}
 finally{setBusy(false);}
});
$('cs-reset').addEventListener('click',()=>{editor.value=initial;output.textContent='Contoh awal dipulihkan.';});
$('cs-example').addEventListener('change',e=>editor.value=examples[e.target.value]||initial);
editor.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const a=editor.selectionStart,b=editor.selectionEnd;editor.setRangeText('    ',a,b,'end');}if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();$('cs-run').click();}});
