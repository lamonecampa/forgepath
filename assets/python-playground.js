(()=> {
 const $=id=>document.getElementById(id), editor=$('py-code'), output=$('py-output'), status=$('py-status'), version=$('py-version'), initial=editor.value;
 const examples={
 hello:'nama = "ForgePath"\nprint(f"Halo, {nama}!")\nfor angka in range(1, 6):\n    print(angka, angka ** 2)',
 types:'umur = 20\ntinggi = 1.72\naktif = True\nhobi = ["membaca", "coding"]\nprofil = {"nama": "Ayu", "umur": umur}\nprint(type(umur).__name__, type(tinggi).__name__)\nprint(profil)',
 condition:'nilai = 82\nif nilai >= 85:\n    predikat = "A"\nelif nilai >= 75:\n    predikat = "B"\nelse:\n    predikat = "Perlu belajar lagi"\nprint("Predikat:", predikat)',
 loop:'total = 0\nfor angka in range(1, 11):\n    total += angka\nprint("Jumlah 1 sampai 10:", total)\n\nn = 3\nwhile n > 0:\n    print("Hitung mundur:", n)\n    n -= 1',
 list:'buah = ["apel", "jeruk", "mangga"]\nbuah.append("pisang")\nprint("Daftar:", buah)\nmahasiswa = {"nama": "Budi", "nilai": 90}\nfor k, v in mahasiswa.items():\n    print(k, "=", v)',
 function:'def hitung_luas_persegi_panjang(panjang, lebar):\n    return panjang * lebar\nluas = hitung_luas_persegi_panjang(8, 5)\nprint("Luas:", luas)',
 numpy:'import numpy as np\ndata = np.array([2, 4, 6, 8, 10])\nprint("Data:", data)\nprint("Rata-rata:", data.mean())\nprint("Standar deviasi:", data.std())'
 };
 let worker=null,busy=false,ready=false;
 const setBusy=v=>{busy=v;$('py-run').disabled=v;$('py-run').textContent=v?'Menjalankan…':'▶ Run Python';};
 const start=()=>{if(worker)return;worker=new Worker('assets/python-worker.js');worker.onmessage=({data})=>{
  if(data.type==='ready'){ready=true;version.textContent=data.version;status.textContent='Runtime siap';}
  if(data.type==='loading')status.textContent=data.message;
  if(data.type==='stdout')output.textContent+=(output.textContent?'\n':'')+data.text;
  if(data.type==='done'){setBusy(false);status.textContent='Selesai';}
  if(data.type==='error'){output.textContent+='\n'+data.message;setBusy(false);status.textContent='Terjadi kesalahan';}
 };worker.onerror=e=>{output.textContent='Worker gagal: '+e.message+'\nPeriksa dukungan WebAssembly, koneksi, dan Console browser.';setBusy(false);status.textContent='Worker error';};};
 const run=()=>{if(busy)return;setBusy(true);output.textContent='Menyiapkan runtime dan menjalankan kode…';status.textContent='Memuat runtime';start();worker.postMessage({type:'run',code:editor.value});};
 $('py-run').addEventListener('click',run);
 $('py-reset').addEventListener('click',()=>{editor.value=initial;output.textContent='Editor dipulihkan ke contoh awal.';});
 $('py-clear').addEventListener('click',()=>output.textContent='');
 $('py-example').addEventListener('change',e=>editor.value=examples[e.target.value]||initial);
 editor.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const a=editor.selectionStart,b=editor.selectionEnd;editor.setRangeText('    ',a,b,'end');}if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();run();}});
})();