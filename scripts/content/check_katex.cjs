// Usage: node scripts/content/check_katex.cjs  -- validates every $..$ / $$..$$ span in public/data/*/notes/*.md
const fs = require('fs'), path = require('path');
const katex = require('katex');
const root = path.join(__dirname, '..', '..', 'public', 'data');
let fails = 0, total = 0;
function spans(text) {
  const out = []; let i = 0, line = 1;
  while (i < text.length) {
    const c = text[i];
    if (c === '\n') { line++; i++; continue; }
    if (c === '\\' && text[i + 1] === '$') { i += 2; continue; }
    if (c === '`') { // inline code
      const m = /^`+/.exec(text.slice(i)); const fence = m[0];
      const end = text.indexOf(fence, i + fence.length);
      if (end < 0) { i += fence.length; continue; }
      line += (text.slice(i, end).match(/\n/g) || []).length; i = end + fence.length; continue;
    }
    if (c === '$') {
      const display = text[i + 1] === '$';
      const d = display ? '$$' : '$';
      let j = i + d.length;
      while (j < text.length) {
        if (text[j] === '\\') { j += 2; continue; }
        if (text.startsWith(d, j)) break;
        if (!display && text[j] === '\n' && text[j + 1] === '\n') { j = text.length; break; }
        j++;
      }
      if (j >= text.length) { out.push({ tex: text.slice(i + d.length), display, line, unterminated: true }); break; }
      out.push({ tex: text.slice(i + d.length, j), display, line });
      line += (text.slice(i, j).match(/\n/g) || []).length;
      i = j + d.length; continue;
    }
    i++;
  }
  return out;
}
for (const subj of fs.readdirSync(root).sort()) {
  const dir = path.join(root, subj, 'notes');
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md')).sort()) {
    // blank out fenced code blocks, preserving line count
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const text = raw.replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, m => m.replace(/[^\n]/g, ''));
    for (const s of spans(text)) {
      total++;
      try {
        if (s.unterminated) throw new Error('unterminated math span');
        katex.renderToString(s.tex, { throwOnError: true, displayMode: s.display });
      } catch (e) {
        fails++;
        console.log(`${subj}/${f}:${s.line}: ${e.message.split('\n')[0]}\n    ${JSON.stringify(s.tex.slice(0, 120))}`);
      }
    }
  }
}
console.log(`${total} spans checked, ${fails} failures`);
process.exit(fails ? 1 : 0);
