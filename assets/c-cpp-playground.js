(()=> {
 const $=id=>document.getElementById(id), code=$('cc-code'), output=$('cc-output'), status=$('cc-status'), language=$('cc-language'), standard=$('cc-standard'), example=$('cc-example');
 const initialC=code.value, initialCpp='#include <iostream>\nint main() {\n    std::cout << "Halo dari ForgePath!" << std::endl;\n    return 0;\n}';
 const examples={
  c:{hello:initialC,input:'#include <stdio.h>\nint main(void) {\n    int a, b;\n    if (scanf("%d %d", &a, &b) != 2) return 1;\n    printf("Jumlah = %d\\n", a + b);\n    return 0;\n}',array:'#include <stdio.h>\nint main(void) {\n    int nilai[] = {70, 80, 90, 100};\n    int total = 0;\n    for (int i = 0; i < 4; i++) total += nilai[i];\n    printf("Rata-rata = %.2f\\n", total / 4.0);\n}',function:'#include <stdio.h>\nint kuadrat(int n) { return n * n; }\nint main(void) { printf("%d\\n", kuadrat(7)); return 0; }'},
  cpp:{hello:initialCpp,input:'#include <iostream>\nint main() {\n    int a, b;\n    if (!(std::cin >> a >> b)) return 1;\n    std::cout << "Jumlah = " << a + b << std::endl;\n}',array:'#include <iostream>\n#include <vector>\nint main() {\n    std::vector<int> nilai{70, 80, 90, 100};\n    int total = 0;\n    for (int n : nilai) total += n;\n    std::cout << "Rata-rata = " << total / 4.0 << std::endl;\n}',function:'#include <iostream>\nint kuadrat(int n) { return n * n; }\nint main() { std::cout << kuadrat(7) << std::endl; }'}
 };
 const standards={c:['gnu11','gnu17','gnu23'],cpp:['gnu++11','gnu++14','gnu++17','gnu++20','gnu++23']};
 let worker=null,busy=false,activeLang=null;
 const setStatus=s=>status.textContent=s;
 const stop=()=>{if(worker){worker.terminate();worker=null;}busy=false;$('cc-run').disabled=false;$('cc-run').textContent='▶ Compile & Run';setStatus('Worker dihentikan');};
 const start=()=>{if(worker&&activeLang===language.value)return; if(worker)worker.terminate();activeLang=language.value;worker=new Worker('assets/clang-worker.js',{type:'module'});worker.onmessage=({data})=>{
  if(data.type==='status'){setStatus(data.message);$('cc-runtime').textContent=data.message;}
  if(data.type==='result'){output.textContent=data.output||'(Tidak ada output)';if(data.errors)output.textContent+='\n\nCompiler diagnostics:\n'+data.errors;output.textContent+='\n\nExit code: '+data.exitCode+' | Compile: '+data.compileMs+' ms | Run: '+data.runMs+' ms';busy=false;$('cc-run').disabled=false;$('cc-run').textContent='▶ Compile & Run';setStatus(data.exitCode===0?'Selesai':'Selesai dengan error');}
  if(data.type==='error'){output.textContent=data.message;busy=false;$('cc-run').disabled=false;$('cc-run').textContent='▶ Compile & Run';setStatus('Gagal');}
 };worker.onerror=e=>{output.textContent='Worker error: '+e.message;busy=false;$('cc-run').disabled=false;setStatus('Worker error');};};
 const run=()=>{if(busy)return;busy=true;$('cc-run').disabled=true;$('cc-run').textContent='Compiling…';output.textContent='Menyiapkan compiler WebAssembly…';setStatus('Memuat toolchain');start();worker.postMessage({type:'run',language:language.value,standard:standard.value,code:code.value,stdin:$('cc-stdin').value});};
 const refreshStandards=()=>{standard.innerHTML='';standards[language.value].forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s;standard.append(o);});};
 language.addEventListener('change',()=>{refreshStandards();code.value=examples[language.value].hello;example.value='hello';if(worker){worker.terminate();worker=null;}activeLang=null;busy=false;$('cc-run').disabled=false;$('cc-run').textContent='▶ Compile & Run';setStatus('Compiler akan dimuat saat Run');});
 example.addEventListener('change',()=>{code.value=examples[language.value][example.value];});
 $('cc-run').addEventListener('click',run);$('cc-stop').addEventListener('click',stop);
 $('cc-reset').addEventListener('click',()=>{code.value=examples[language.value].hello;$('cc-stdin').value='';output.textContent='Contoh awal dipulihkan.';});
 code.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const a=code.selectionStart,b=code.selectionEnd;code.setRangeText('    ',a,b,'end');}if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();run();}});
 refreshStandards();
})();