import fs from 'fs';
function getRotationMessage(page) {
  if (!page.useRotation || !page.postsFile) return page.message;
  try {
    const p = page.postsFile.startsWith('./') ? new URL(page.postsFile, import.meta.url).pathname.replace(/^\/([A-Z]:\/)/i, '$1') : page.postsFile;
    const txt = fs.readFileSync(p, 'utf8');
    const arr = JSON.parse(txt);
    if (!Array.isArray(arr) || arr.length === 0) return page.message;
    const idx = new Date().getDate() % arr.length;
    return arr[idx];
  } catch (e) {
    return page.message;
  }
}
const pages = [
  {
    key: 'DEUTSCH',
    pageId: '1001494063045749',
    token: 'EAAOXkUfVK4YBS1x7vHk66Fp5c5Kw6oUFmFOGbWPkzJkFZCVG0ZCrv8axbu7Ryv7kautoxmXHkZC0bORXwprzBwQL4MPljryq96GVBUWSu9izsD467LfiDpZAC1aabnuCZCUvzqLZA0SxJgcQkqgvDa0wWNJtZAeMFBazbms9BTxckqYWgB6uwyy9A8tGzZBY1g5j3wZDZD',
    imageName: 'deutsch.jpg',
    message: null,
    useRotation: true,
    postsFile: './posts/deutsch.json'
  },

  {
    key: 'M3AK',
    pageId: process.env.FB_PAGE_ID_M3AK,
    token: process.env.FB_TOKEN_M3AK,
    imageName: 'm3ak.jpg',
    message: 'أسرع دليفيري دواء في كفر الزيات لحد باب بيتك m3ak'
  },
  {
    key: 'DLEL',
    pageId: process.env.FB_PAGE_ID_DLEL,
    token: process.env.FB_TOKEN_DLEL,
    imageName: 'dlel.jpg',
    message: 'دليل كفر الزيات | كل المحلات والخدمات عندك خطوة واحدة'
  },
  {
    key: 'KESHK',
    pageId: process.env.FB_PAGE_ID_KESHK,
    token: process.env.FB_TOKEN_KESHK,
    imageName: 'keshk.jpg',
    message: 'صيدلية كشك كفر الزيات | الأدوية متوفرة وسرعة توصيل'
  }
];

async function postPage(p) {
  if (!p.pageId || !p.token) {
    console.log(`⏭️ Skip ${p.key} (missing env)`);
    return;
  }
  const imageUrl = `https://raw.githubusercontent.com/mhmodkeshk/m3ak-poster/main/${p.imageName}`;
  const url = `https://graph.facebook.com/v19.0/${p.pageId}/photos`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: imageUrl, message: p.message, access_token: p.token })
  });
  const data = await res.json();
  if (data.id) {
    console.log(`✅ [${p.key}] Posted! Photo ID: ${data.id}`);
  } else {
    console.error(`❌ [${p.key}] Failed: ${JSON.stringify(data)}`);
    throw new Error(`Failed posting ${p.key}`);
  }
}

async function post() {
  for (const p of pages) {
    await postPage(p);
  }
}

post();
