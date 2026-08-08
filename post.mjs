const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

const message = 'أسرع دليفيري دواء في كفر الزيات لحد باب بيتك m3ak';

async function post() {
  const imageUrl = 'https://raw.githubusercontent.com/mhmodkeshk/m3ak-poster/main/m3ak.png';
  const url = `https://graph.facebook.com/v19.0/${FB_PAGE_ID}/photos`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: imageUrl, message, access_token: FB_ACCESS_TOKEN }),
  });

  const data = await res.json();
  if (data.id) {
    console.log(`✅ Posted! Post ID: ${data.id}`);
  } else {
    console.error('❌ Failed:', JSON.stringify(data));
    process.exit(1);
  }
}

post();
