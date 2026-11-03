import { PHP } from '@php-wasm/universal';
import { loadWebRuntime } from '@php-wasm/web';

const editor = document.querySelector('#php-code');
const output = document.querySelector('#php-output');
const preview = document.querySelector('#php-preview');
const status = document.querySelector('#php-status');
const runButton = document.querySelector('#run-php');
const resetButton = document.querySelector('#reset-php');
const copyButton = document.querySelector('#copy-php');
const exampleSelect = document.querySelector('#php-example');

const examples = {
  hello: `<?php
$nama = "ForgePath";
$versi = PHP_VERSION;

echo "Halo, " . $nama . "!\\n";
echo "Interpreter PHP: " . $versi . "\\n";

$harga = 150000;
$diskon = 0.1;
$total = $harga - ($harga * $diskon);

echo "Total setelah diskon: Rp " . number_format($total, 0, ',', '.');
?>`,
  condition: `<?php
$nilai = 86;

if ($nilai >= 85) {
    $predikat = "A";
    $status = "Sangat baik";
} elseif ($nilai >= 70) {
    $predikat = "B";
    $status = "Lulus";
} else {
    $predikat = "C";
    $status = "Perlu perbaikan";
}

echo "Nilai: $nilai\\n";
echo "Predikat: $predikat\\n";
echo "Status: $status";
?>`,
  loop: `<?php
echo "Tabel perkalian 5\\n";

for ($i = 1; $i <= 10; $i++) {
    echo "5 x $i = " . (5 * $i) . "\\n";
}
?>`,
  function: `<?php
function hitungRataRata(array $nilai): float {
    if (count($nilai) === 0) {
        return 0;
    }

    return array_sum($nilai) / count($nilai);
}

$data = [80, 90, 75, 95, 85];
echo "Rata-rata: " . hitungRataRata($data);
?>`,
  array: `<?php
$mahasiswa = [
    ["nama" => "Dina", "nilai" => 88],
    ["nama" => "Budi", "nilai" => 76],
    ["nama" => "Sari", "nilai" => 94],
];

foreach ($mahasiswa as $mhs) {
    echo $mhs["nama"] . ": " . $mhs["nilai"] . "\\n";
}
?>`,
  oop: `<?php
class Mahasiswa {
    public function __construct(
        public string $nama,
        public float $nilai
    ) {}

    public function status(): string {
        return $this->nilai >= 70 ? "Lulus" : "Belum lulus";
    }
}

$mhs = new Mahasiswa("Dina", 88);
echo $mhs->nama . " - " . $mhs->status();
?>`,
  html: `<?php
$daftar = ["PHP", "MySQL", "Laravel"];

echo "<h2>Learning Path ForgePath</h2>";
echo "<ul>";

foreach ($daftar as $materi) {
    echo "<li>" . htmlspecialchars($materi, ENT_QUOTES, "UTF-8") . "</li>";
}

echo "</ul>";
?>`
};

let php = null;
let loading = null;
let currentExample = 'hello';

const setStatus = (message) => { status.textContent = message; };
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[char]));

async function getRuntime() {
  if (php) return php;
  if (loading) return loading;
  loading = (async () => {
    setStatus('Mengunduh runtime PHP 8.4…');
    const runtimeId = await loadWebRuntime('8.4');
    php = new PHP(runtimeId);
    setStatus('PHP 8.4 siap');
    return php;
  })();
  try {
    return await loading;
  } catch (error) {
    loading = null;
    setStatus('Runtime gagal dimuat');
    throw error;
  }
}

async function runPhp() {
  runButton.disabled = true;
  output.textContent = 'Menjalankan PHP…';
  setStatus('Menjalankan kode');
  try {
    const runtime = await getRuntime();
    const source = editor.value;
    const result = await runtime.runStream({ code: source });
    const stdout = await result.stdoutText;
    const stderr = await result.stderrText;
    output.textContent = stdout || '(Tidak ada output)';
    if (stderr) output.textContent += '\n\nSTDERR:\n' + stderr;
    if (typeof result.exitCode === 'number' && result.exitCode !== 0) {
      output.textContent += '\n\nExit code: ' + result.exitCode;
    }
    preview.srcdoc = '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font:14px system-ui,sans-serif;padding:20px;color:#1c2420}pre{white-space:pre-wrap}</style></head><body>' + (stdout || '<p><em>PHP tidak menghasilkan output HTML.</em></p>') + '</body></html>';
    setStatus('Selesai');
  } catch (error) {
    output.textContent = 'PHP Runtime Error:\n' + (error?.stack || error?.message || String(error));
    preview.srcdoc = '<p style="font:14px system-ui;padding:16px;color:#9b2c2c">Eksekusi PHP gagal. Periksa pesan error di panel output.</p>';
    setStatus('Eksekusi gagal');
  } finally {
    runButton.disabled = false;
  }
}

runButton.addEventListener('click', runPhp);
resetButton.addEventListener('click', () => {
  editor.value = examples[currentExample];
  output.textContent = 'Contoh dipulihkan. Jalankan untuk melihat hasil.';
  preview.srcdoc = '';
});
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(editor.value);
    setStatus('Kode disalin');
  } catch {
    setStatus('Clipboard tidak tersedia');
  }
});
exampleSelect.addEventListener('change', () => {
  currentExample = exampleSelect.value;
  editor.value = examples[currentExample];
  output.textContent = 'Contoh dimuat. Tekan Jalankan PHP.';
  preview.srcdoc = '';
});
editor.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    runPhp();
  }
});
