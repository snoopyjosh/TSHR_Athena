import mapping from './data.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

const $in = document.getElementById('in');
const $out = document.getElementById('out');
const $clr = document.getElementById('clr');
const $tbody = document.querySelector('#table tbody');

function num4(str) {
  return (str || '').replace(/\D/g, '').slice(0,4);
}

function lookup4(key) {
  if (!key || key.length !== 4) {
    $out.innerHTML = '—';
    return;
  }
  const hi = key.slice(0,2);
  const lo = key.slice(2,4);
  const valid = Object.prototype.hasOwnProperty.call(mapping, hi) && Object.prototype.hasOwnProperty.call(mapping, lo);
  if (!valid) {
    const errs = [];
    if (!Object.prototype.hasOwnProperty.call(mapping, hi)) errs.push(`HI=${hi}`);
    if (!Object.prototype.hasOwnProperty.call(mapping, lo)) errs.push(`LO=${lo}`);
    $out.innerHTML = `<span class="bad">超出範圍或無對應（${errs.join(', ')}；允許 00–50）</span>`;
    return;
  }
  const mappedHi = String(mapping[hi]);
  const mappedLo = String(mapping[lo]);
  $out.innerHTML = `<span class="ok">Answer: ${mappedHi}${mappedLo}</span>`;
}

$in.addEventListener('input', () => {
  $in.value = num4($in.value);
  lookup4($in.value);
});

$clr.addEventListener('click', () => {
  $in.value = '';
  $in.focus();
  lookup4('');
});

// Render table in two columns
const keys = Object.keys(mapping).map(k=>parseInt(k,10)).sort((a,b)=>a-b);
for (let i = 0; i < keys.length; i += 2) {
  const k1 = keys[i];
  const k2 = keys[i+1];
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${k1.toString().padStart(2,'0')}</td><td>${mapping[k1.toString().padStart(2,'0')]}</td>` +
                 `<td>${k2!==undefined?k2.toString().padStart(2,'0'):''}</td><td>${k2!==undefined?mapping[k2.toString().padStart(2,'0')]:''}</td>`;
  $tbody.appendChild(tr);
}
