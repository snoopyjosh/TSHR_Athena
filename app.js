import qa from './data.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

const $q1 = document.getElementById('q1');
const $q2 = document.getElementById('q2');
const $a1 = document.getElementById('a1');
const $a2 = document.getElementById('a2');
const $cat12 = document.getElementById('cat12');
const $cat21 = document.getElementById('cat21');
const $pad2 = document.getElementById('pad2');
const $pad3 = document.getElementById('pad3');
const $sum = document.getElementById('sum');
const $diff = document.getElementById('diff');
const $clr = document.getElementById('clr');

function padN(n, width) {
  const s = String(n);
  if (s.length >= width) return s;
  return '0'.repeat(width - s.length) + s;
}

function lookup() {
  const q1 = parseInt($q1.value, 10);
  const q2 = parseInt($q2.value, 10);
  const v1 = Number.isInteger(q1) ? qa[q1] : undefined;
  const v2 = Number.isInteger(q2) ? qa[q2] : undefined;

  $a1.textContent = v1 !== undefined ? v1 : '—';
  $a2.textContent = v2 !== undefined ? v2 : '—';

  if (v1 !== undefined && v2 !== undefined) {
    $cat12.textContent = String(v1) + String(v2);
    $cat21.textContent = String(v2) + String(v1);
    $pad2.textContent  = padN(v1, 2) + padN(v2, 2);
    $pad3.textContent  = padN(v1, 3) + padN(v2, 3);
    $sum.textContent   = v1 + v2;
    $diff.textContent  = Math.abs(v1 - v2);
  } else {
    $cat12.textContent = $cat21.textContent = $pad2.textContent = $pad3.textContent = $sum.textContent = $diff.textContent = '—';
  }
}

$q1.addEventListener('input', lookup);
$q2.addEventListener('input', lookup);
$clr.addEventListener('click', () => {
  $q1.value = ''; $q2.value = '';
  lookup();
});

// render table in two columns
const $tbody = document.querySelector('#table tbody');
const keys = Object.keys(qa).map(Number).sort((a,b)=>a-b);
for (let i = 0; i < keys.length; i += 2) {
  const k1 = keys[i];
  const k2 = keys[i+1];
  const a1 = qa[k1];
  const a2 = k2 !== undefined ? qa[k2] : '';
  const a2v = k2 !== undefined ? qa[k2] : '';
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${k1}</td><td>${a1}</td><td>${k2 !== undefined ? k2 : ''}</td><td>${k2 !== undefined ? a2v : ''}</td>`;
  $tbody.appendChild(tr);
}
