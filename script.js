/* ...existing code... */
const snippet = document.getElementById('snippet');
const copyBtn = document.getElementById('copyBtn');
// const selectBtn = document.getElementById('selectBtn');
const getKeyBtn = document.getElementById('getKeyBtn');

copyBtn.addEventListener('click', async () => {
  const text = snippet.innerText.trim();
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = '已复制';
    setTimeout(() => { copyBtn.textContent = '复制'; }, 1400);
  } catch (e) {
    // fallback
    const range = document.createRange();
    range.selectNodeContents(snippet);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try { document.execCommand('copy'); copyBtn.textContent = '已复制'; }
    catch { copyBtn.textContent = '复制失败'; }
    setTimeout(() => { copyBtn.textContent = '复制'; sel.removeAllRanges(); }, 1400);
  }
});

// removed selectBtn event listener

getKeyBtn.addEventListener('click', async () => {
  const key = '30072025';
  try {
    await navigator.clipboard.writeText(key);
    getKeyBtn.textContent = '已获取';
    setTimeout(() => { getKeyBtn.textContent = '获取Key'; }, 1400);
  } catch (e) {
    getKeyBtn.textContent = '获取失败';
    setTimeout(() => { getKeyBtn.textContent = '获取Key'; }, 1400);
  }
});

/* ...existing code... */