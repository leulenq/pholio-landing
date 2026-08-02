import { chromium } from 'playwright-core';
const OUT = '/tmp/claude-501/-Users-lenquanhone-Projects-pholio-landing/ececd8cf-973b-4e4b-8ee1-ad3897bfaead/scratchpad';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3001/talent', { waitUntil: 'networkidle', timeout: 60000 });
// dismiss consent without clicking (a click parks the site's cursor ring in frame)
await p.context().addCookies([{ name: 'pholio_consent', value: encodeURIComponent(JSON.stringify({ v: 1, necessary: true, analytics: false, updatedAt: new Date().toISOString() })), domain: 'localhost', path: '/' }]);
await p.reload({ waitUntil: 'networkidle' });
const geom = await p.evaluate(() => {
  const el = document.getElementById('send');
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, span: el.offsetHeight - window.innerHeight };
});
const at = (t) => geom.top + t * geom.span;
const beats = process.argv.slice(2).length
  ? process.argv.slice(2).map((s) => { const [n, t] = s.split(':'); return [n, Number(t)]; })
  : [['a-arrive',0.24],['b-digitals',0.32],['c-stats',0.40],['d-book',0.49],['e-cc',0.57],['f-note',0.66],['g-cleared',0.80],['h-dispatch',0.92]];
for (const [name, t] of beats) {
  await p.evaluate((y) => window.scrollTo(0, y), at(t));
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/send-${name}.png` });
}
console.log(JSON.stringify(geom));
await b.close();
