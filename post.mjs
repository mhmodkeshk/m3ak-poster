const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

const messages = [
  `💊 معاك — صيدليتك أونلاين

 اطلب أدويتك واحنا نوصلها لحد البيت!
 كل اللي عليك تتواصل معانا على واتساب وهنخدمك فوراً.

 للتواصل: https://wa.me/201016264637
`,
  `🩺 عايز روشتة توصلك؟
 معاك بتسهيلك الموضوع — ابعت روشتتك واحنا نهتم بالباقي.
 توصيل مجاني وسريع.

 للطلب: https://wa.me/201016264637
`,
  `🌡️ صحتك تهمنا!
 معاك — خدمة توصيل الأدوية والروشتات لكل العملاء.
 نوصل لكل مكان في أسرع وقت.

 ابعت طلبك دلوقتي: https://wa.me/201016264637
`,
  `✨ عروض ومنتجات متنوعة في معاك
 كل اللي محتاجه من الأدوية والفيتامينات والمستحضرات متوفر.
 أسعار مناسبة وتوصيل سريع.

 للاستفسار: https://wa.me/201016264637
`,
  `💪 علاجك الشهري بأفضل سعر!
 معاك بتوفرلك علاجك الشهري بأقل الأسعار مع خدمة التوصيل المنتظم.
 ما تتحملش هم التوصيل كل شهر.

 للاشتراك: https://wa.me/201016264637
`,
  `👨‍⚕️ معاك — دايماً في خدمتك
 صيدليتك الموثوقة لكل احتياجاتك الدوائية.
 استشيرنا واحنا نوجهك لأفضل المنتجات المناسبة ليك.

 كلمنا واتساب: https://wa.me/201016264637
`,
  `🏥 روشتتك من غير تعب
 معاك —攝 ابعت روشتتك على واتساب واحنا نوصلها لك
 مع ضمان الجودة والتوصيل الآمن.

 للطلب: https://wa.me/201016264637
`,
];

async function post() {
  const today = new Date();
  const dayIndex = today.getDate() % messages.length;
  const message = messages[dayIndex];

  const url = `https://graph.facebook.com/v19.0/${FB_PAGE_ID}/feed`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      access_token: FB_ACCESS_TOKEN,
    }),
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
