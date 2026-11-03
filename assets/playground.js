(()=> {
  const defaults = {
    html: document.querySelector('#editor-html').value,
    css: document.querySelector('#editor-css').value,
    js: document.querySelector('#editor-js').value
  };
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const editors = {html:document.querySelector('#editor-html'),css:document.querySelector('#editor-css'),js:document.querySelector('#editor-js')};
  const frame = document.querySelector('#preview-frame');
  const output = document.querySelector('#play-console');
  const status = document.querySelector('#play-status');
  let runId = 0;
  let active = 'html';
  tabs.forEach(tab => tab.addEventListener('click', () => {
    active = tab.dataset.tab;
    tabs.forEach(item => {const selected=item===tab;item.classList.toggle('active',selected);item.setAttribute('aria-selected',String(selected));});
    Object.entries(editors).forEach(([key,editor])=>editor.classList.toggle('active',key===active));
  }));
  const run = () => {
    const id = ++runId;
    output.textContent = 'Menjalankan preview…';
    status.textContent = 'Running';
    const html = editors.html.value;
    const css = editors.css.value.replace(/<\\/style/gi,'<\\\\/style');
    const js = editors.js.value.replace(/<\\/script/gi,'<\\\\/script');
    const bridge = `<script>
      (() => {
        const runId = ${id};
        const send = (type, args) => parent.postMessage({forgepathPlayground:true,runId,type,args}, '*');
        ['log','info','warn','error','debug'].forEach(level => {
          const original = console[level].bind(console);
          console[level] = (...args) => { original(...args); send(level,args.map(value => {try{return typeof value==='string'?value:JSON.stringify(value)}catch{return String(value)}})); };
        });
        addEventListener('error', event => send('error',[event.message + ' (' + event.lineno + ':' + event.colno + ')']));
        addEventListener('unhandledrejection', event => send('error',[String(event.reason)]));
      })();
    <\\/script>`;
    frame.srcdoc = '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + css + '</style></head><body>' + html + bridge + '<script>try{\\n' + js + '\\n}catch(error){console.error(error.stack || error.message)}<\\/script></body></html>';
    status.textContent = 'Preview diperbarui';
  };
  window.addEventListener('message', event => {
    if(event.source!==frame.contentWindow || !event.data || event.data.forgepathPlayground!==true || event.data.runId!==runId) return;
    const line = '['+event.data.type.toUpperCase()+'] '+(event.data.args||[]).join(' ');
    output.textContent = output.textContent==='Menjalankan preview…' ? line : output.textContent+'\\n'+line;
  });
  document.querySelector('#run-code').addEventListener('click',run);
  document.querySelector('#reset-code').addEventListener('click',()=>{Object.entries(editors).forEach(([key,editor])=>editor.value=defaults[key]);output.textContent='Contoh awal dipulihkan.';run();});
  document.querySelector('#clear-console').addEventListener('click',()=>output.textContent='Console dibersihkan.');
  document.querySelector('#copy-code').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(editors[active].value);status.textContent='Kode disalin';}catch{status.textContent='Clipboard tidak tersedia';}});
  run();
})();