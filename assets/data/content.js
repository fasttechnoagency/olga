/* =====================================================================
   محتوى متجر أولغا — هذا هو الملف الذي تعدّل منه كل محتوى الموقع
   ---------------------------------------------------------------------
   • المنتجات والأسعار والأحجام، الأقسام، شرائح الواجهة، الريلز، المدن وطرق الدفع،
     كل نصوص الموقع بالعربي والإنجليزي، ومعلومات المساعدة «شمس» — كلها هنا.
   • لا تحتاج أن تفتح script.js لتغيير أي نص أو سعر.
   • عدّل القيم فقط وحافظ على الفواصل والأقواس وعلامات التنصيص.
   • الأسعار بالدينار الأردني (JOD).
   • إذا كانت لديك لوحة تحكم تُصدّر المحتوى، يكفي أن تُنتج ملفاً بنفس هذا الشكل
     (window.OLGA_CONTENT) وتستبدل به هذا الملف.

   Olga store content — the one file to edit products, prices, texts and
   assistant knowledge. Values are exactly those of the original page.
   ===================================================================== */
window.OLGA_CONTENT=(function(){
"use strict";
/* مساعد لكتابة الأحجام: ml(300) => {en:"300 ml", ar:"300 مل"} */
function ml(n){return {en:n+" ml",ar:n+" مل"}}

/* ---------- 1) التواصل · contact ---------- */
var whatsapp="962792000155";   /* رقم واتساب الطلبات (بدون + وبدون أصفار في البداية) */

/* ---------- 2) أقسام المتجر · shop categories ---------- */
var categories=["all","body","laundry","hammam","sets"];

/* ---------- 3) المنتجات والأسعار · products & prices ----------
   كل منتج: الاسم، النوع، الوصف، المكونات، المميزات، الأحجام (variants) وسعر كل حجم (price)،
   وصور المعرض (gallery: مفاتيح من images.js). */
var products=[
 {id:"nabulsi",cat:"body",acc:"#87916B",badge:{en:"Signature",ar:"الأصلي"},
  name:{en:"Nabulsi Liquid Soap",ar:"صابون نابلسي سائل"},
  type:{en:"Hand wash & shower soap",ar:"غسول للأيدي وصابون استحمام"},
  desc:{en:"A rich formula infused with natural oils that provides deep hydration and exceptional softness for your hands.",ar:"تركيبة غنية بالزيوت الطبيعية، توفّر ترطيبًا فائقًا ونعومة لليدين."},
  ing:{en:"Olive oil, natural oil extracts, potassium hydroxide, purified water",ar:"زيت الزيتون، خلاصة زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["Extracted from olive oil","Deep hydration & softness","Hand wash & shower soap","100% natural"],ar:["مستخلص من زيت الزيتون","ترطيب فائق ونعومة","غسول للأيدي وصابون استحمام","طبيعي 100%"]},
  variants:[{id:"nabulsi-300",size:ml(300),price:3.50,cut:"nabulsi-900",sc:.8},{id:"nabulsi-900",size:ml(900),price:6.50,cut:"nabulsi-900",sc:1}],def:1,
  gallery:["ph_nabulsi","gift_red","ig_nabulsi","ig_hero_still"],
  spread:{bg:"grove",cal:"نابلسي",sub:"Nabulsi Liquid Soap",page:"06",b1:"nabulsi-900",b2:"nabulsi-900",sizes:"300ml | 900ml"}},
 {id:"shea",cat:"body",acc:"#896832",badge:{en:"Deep moisture",ar:"ترطيب عميق"},
  name:{en:"Shea Butter Liquid Soap",ar:"صابون سائل بزبدة الشيا"},
  type:{en:"Hand wash & shower soap",ar:"غسول للأيدي وصابون استحمام"},
  desc:{en:"A gentle formula enriched with natural shea butter that deeply moisturizes the skin, protects it from dryness, and leaves it soft and refreshed all day long.",ar:"تركيبة لطيفة وغنية بزبدة الشيا الطبيعية، ترطّب البشرة بفعالية وتحميها من الجفاف، وتمنحها نعومة وانتعاشًا يدوم."},
  ing:{en:"Shea butter, natural oil extracts, potassium hydroxide, purified water",ar:"زبدة الشيا، خلاصة زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["Shea butter for deep moisture","Protects from dryness","Soft, refreshed skin all day","100% natural"],ar:["زبدة الشيا لترطيب عميق","تحمي البشرة من الجفاف","نعومة وانتعاش يدوم","طبيعي 100%"]},
  variants:[{id:"shea-300",size:ml(300),price:3.50,cut:"shea-300",sc:.84},{id:"shea-900",size:ml(900),price:6.50,cut:"shea-900",sc:1}],def:1,
  gallery:["ph_shea","gift_spot","ig_shea300","ig_shea_anatomy","ig_woman"],
  spread:{bg:"shea_seeds",cal:"الشيا",sub:"Shea Butter Liquid Soap",page:"07",b1:"shea-900",sizes:"300ml | 900ml"}},
 {id:"laurel",cat:"body",acc:"#4D713B",badge:{en:"Purifying",ar:"منقٍّ ومهدّئ"},
  name:{en:"Liquid Laurel Soap",ar:"صابون غار سائل"},
  type:{en:"Hand wash & shower soap",ar:"غسول للأيدي وصابون استحمام"},
  desc:{en:"A natural formula made with laurel oil, known for its purifying and soothing properties. Suitable for all skin types.",ar:"تركيبة طبيعية بزيت الغار المعروف بخصائصه المطهّرة، مناسب لجميع أنواع البشرة."},
  ing:{en:"Laurel oil, natural oils, potassium hydroxide, purified water",ar:"زيت الغار، زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["Laurel oil as the key ingredient","Purifying & soothing","Suitable for all skin types","100% natural"],ar:["زيت الغار مكوّن أساسي","مطهّر ومهدّئ","مناسب لجميع أنواع البشرة","طبيعي 100%"]},
  variants:[{id:"laurel-300",size:ml(300),price:3.50,cut:"laurel-300",sc:.84},{id:"laurel-900",size:ml(900),price:6.50,cut:"laurel-900",sc:1}],def:0,
  gallery:["ph_laurel","gift_hand","ig_laurel","ig_handwash"],
  spread:{bg:"laurel_leaf",cal:"الغار",sub:"Liquid Laurel Soap",page:"08",b1:"laurel-300",sizes:"300ml | 900ml"}},
 {id:"laundry",cat:"laundry",acc:"#5B8C42",badge:{en:"Sensitive skin",ar:"للبشرة الحساسة"},
  name:{en:"Nabulsi Laundry Soap",ar:"صابون نابلسي لغسيل الملابس"},
  type:{en:"For children & adults",ar:"للأطفال والكبار"},
  desc:{en:"A gentle formula that cleans deeply and removes tough stains while keeping fabrics soft. Ideal for children’s clothing, safe for sensitive skin and suitable for the whole family’s laundry.",ar:"تركيبة لطيفة تنظّف بعمق وتزيل البقع الصعبة، مع الحفاظ على نعومة الأقمشة. مثالي لملابس الأطفال الصغار ولا يسبب تهيّجًا للبشرة الحساسة، وآمن لملابس جميع أفراد العائلة."},
  ing:{en:"Purified water, fragrance, natural oils, potassium hydroxide",ar:"ماء نقي، عطر، زيوت طبيعية، هيدروكسيد البوتاسيوم"},
  points:{en:["Removes tough stains","Keeps fabrics soft","Ideal for children’s clothes","Extracted from olive oil"],ar:["يزيل البقع الصعبة","يحافظ على نعومة الأقمشة","مثالي لملابس الأطفال","مستخلص من زيت الزيتون"]},
  variants:[{id:"laundry-1800",size:{en:"1800 g",ar:"1800 غ"},price:4.50,cut:"laundry",sc:1}],def:0,
  gallery:["ph_laundry"],
  spread:{bg:"bubbles",cal:"نابلسي",sub:"Nabulsi Laundry Soap",page:"09",b1:"laundry",deco:"baby",sizes:"1.800g"}},
 {id:"moroccan",cat:"hammam",acc:"#7C1D2B",badge:{en:"Detox & exfoliation",ar:"تقشير وديتوكس"},
  name:{en:"Moroccan Hammam Soap",ar:"صابون الحمّام المغربي"},
  type:{en:"Deep cleansing ritual",ar:"طقس تنظيف عميق"},
  desc:{en:"A traditional soap enriched with natural Moroccan oils that enhance the skin’s radiance and softness — a luxurious formula inspired by authentic Moroccan beauty rituals.",ar:"صابون تقليدي غني بزيوت مغربية طبيعية يعزّز إشراقة ونعومة البشرة — تركيبة فاخرة مستوحاة من طقوس الجمال المغربي."},
  ing:{en:"Natural Moroccan oils",ar:"زيوت مغربية طبيعية"},
  points:{en:["100% natural","Deep cleansing","Detox & exfoliation","Radiance & softness"],ar:["طبيعي 100%","تنظيف عميق","ديتوكس وتقشير","إشراقة ونعومة"]},
  variants:[{id:"moroccan-jar",size:{en:"Jar · gift box",ar:"علبة · صندوق هدية"},price:5.00,cut:"moroccan",sc:1,wide:true}],def:0,
  gallery:[],
  spread:{bg:"face_moroccan",cal:"المغربي",sub:"Moroccan Hammam Soap",page:"10",b1:"moroccan",deco:"stones",wide:true,sizes:"100% Natural"}},
 {id:"shea-duo",cat:"sets",acc:"#9E7A3C",badge:{en:"Gift set",ar:"مجموعة هدية"},
  name:{en:"Shea Ritual Duo",ar:"ثنائي الشيا"},
  type:{en:"300 ml + 900 ml",ar:"300 مل + 900 مل"},
  desc:{en:"One for the sink, one for the shower — the complete shea butter ritual. A thoughtful gift, or a treat for yourself.",ar:"واحدة للمغسلة وأخرى للاستحمام — طقس زبدة الشيا الكامل. هدية مميزة أو دلال لنفسك."},
  ing:{en:"Shea butter, natural oil extracts, potassium hydroxide, purified water",ar:"زبدة الشيا، خلاصة زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["Shea Butter Liquid Soap 300 ml","Shea Butter Liquid Soap 900 ml","Beautiful as a gift"],ar:["صابون الشيا السائل 300 مل","صابون الشيا السائل 900 مل","مثالية كهدية"]},
  variants:[{id:"shea-duo",size:{en:"2 bottles",ar:"عبوتان"},price:9.50,cut:"shea-duo",sc:1}],def:0,
  gallery:["ph_shea","gift_spot","gift_red","ig_shea_anatomy"]},
 {id:"home-set",cat:"sets",acc:"#9E7A3C",badge:{en:"Best value",ar:"الأوفر"},
  name:{en:"The Olga Home Set",ar:"مجموعة أولغا للمنزل"},
  type:{en:"6 bottles",ar:"6 عبوات"},
  desc:{en:"Six bottles of natural care to fill your home — Olga shea butter liquid soaps for every sink and shower.",ar:"ست عبوات من العناية الطبيعية لكل مغسلة وحمّام في منزلك — صابون أولغا السائل بزبدة الشيا."},
  ing:{en:"Shea butter, natural oil extracts, potassium hydroxide, purified water",ar:"زبدة الشيا، خلاصة زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["6 × Olga liquid soap","Natural care for every room","Best value for families"],ar:["6 × صابون أولغا السائل","عناية طبيعية لكل غرفة","الخيار الأوفر للعائلات"]},
  variants:[{id:"home-set",size:{en:"6 bottles",ar:"6 عبوات"},price:19.00,cut:"home-set",sc:1,wide:true}],def:0,
  gallery:["gift_spot","gift_hand","gift_red","ig_family_bottles","ig_family_sofa"]}
];

/* ---------- 4) ريلز الصور · reels strip ---------- */
var reels=[
 {img:"ig_oil_swirl",t:{en:"Liquid gold",ar:"ذهب سائل"},s:{en:"The pour",ar:"السكب"}},
 {img:"ig_nabulsi",t:{en:"Held by nature",ar:"من الطبيعة إلى يديك"},s:{en:"Nabulsi",ar:"نابلسي"}},
 {img:"ig_family_sofa",t:{en:"Everyday moments",ar:"لحظات كل يوم"},s:{en:"At home",ar:"في البيت"}},
 {img:"ig_woman",t:{en:"After a long day",ar:"بعد يوم طويل"},s:{en:"Shea butter",ar:"زبدة الشيا"}},
 {img:"ig_handwash",t:{en:"A softer wash",ar:"غسلة أنعم"},s:{en:"Laurel",ar:"الغار"}},
 {img:"ig_family_bottles",t:{en:"Shared at the table",ar:"على مائدة العائلة"},s:{en:"Family",ar:"العائلة"}},
 {img:"ig_shea_anatomy",t:{en:"Inside the bottle",ar:"ما بداخل العبوة"},s:{en:"Ingredients",ar:"المكونات"}}
];

/* ---------- 5) شرائح الواجهة الرئيسية · hero slides ----------
   pid = المنتج، bg = صورة الخلفية (من images.js)، k/t/d = مفاتيح نصوص من texts. */
var heroSlides=[
 {pid:"nabulsi",v:"nabulsi-900",bg:"banner_olive",p1:"nabulsi-900",p2:"nabulsi-900",x:.5,y:.79,w:.52,fx:"dust",acc:"#CFA866",k:"hb1k",t:"hb1t",d:"hb1d"},
 {pid:"shea",v:"shea-900",bg:"banner_shea",p1:"shea-900",p2:"shea-300",x:.534,y:.745,w:.58,fx:"dust",acc:"#C89C52",k:"hb2k",t:"hb2t",d:"hb2d"},
 {pid:"laurel",v:"laurel-300",bg:"banner_laurel",p1:"laurel-300",x:.497,y:.752,w:.55,fx:"bubble",acc:"#A3B278",k:"hb3k",t:"hb3t",d:"hb3d"},
 {pid:"moroccan",v:"moroccan-jar",bg:"banner_moroccan",p1:"moroccan",x:.5,y:.75,w:.47,fx:"ember",acc:"#C0394B",k:"hb4k",t:"hb4t",d:"hb4d",wide:true},
 {pid:"home-set",v:"home-set",bg:"banner_home",p1:"home-set",x:.503,y:.765,w:.84,fx:"dust",acc:"#CFA866",k:"hb5k",t:"hb5t",d:"hb5d",wide:true}
];

/* ---------- 6) التوصيل والدفع · delivery & payment ---------- */
var cities={ar:["عمّان","الزرقاء","إربد","العقبة","السلط","مادبا","جرش","عجلون","المفرق","الكرك","الطفيلة","معان","الرصيفة"],en:["Amman","Zarqa","Irbid","Aqaba","Salt","Madaba","Jerash","Ajloun","Mafraq","Karak","Tafilah","Ma'an","Russeifa"]};
var payments=["cod","cliq","wallet"];   /* cod = الدفع عند الاستلام، cliq = كليك، wallet = محفظة إلكترونية */

/* ---------- 7) كل نصوص الموقع · all site texts (en / ar) ---------- */
var texts={
en:{
 skip:"Skip to shop",heroAria:"Olga — featured products",hbFrom:"From",hbMore:"Discover",hb1k:"The original · Nabulsi",hb1t:'Olive gold, <em>in your hands</em>',hb1d:"Nabulsi liquid soap with pure olive oil — deep hydration and exceptional softness for hands and body.",hb2k:"Deep moisture · Shea",hb2t:'Softness that <em>lasts all day</em>',hb2d:"Enriched with natural shea butter to protect skin from dryness and keep it soft and refreshed.",hb3k:"Purifying · Laurel",hb3t:'The purity of <em>laurel oil</em>',hb3d:"Laurel oil, known for its purifying and soothing properties — suitable for every skin type.",hb4k:"Detox & exfoliation · Hammam",hb4t:'A Moroccan hammam <em>ritual at home</em>',hb4d:"A traditional soap rich in natural Moroccan oils that enhances the skin’s radiance and softness.",hb5k:"Best value · Home set",hb5t:'Natural care <em>for every room</em>',hb5d:"Six bottles of Olga liquid soap for every sink and shower in your home — the family’s best value.",shopK:"OLGA Line · The shop",tr1t:"99% natural",tr1s:"Sulfate & paraben free",tr2t:"Delivery across Jordan",tr2s:"Confirmed with you on WhatsApp",tr3t:"Order in seconds",tr3s:"Checkout straight to WhatsApp",tr4t:"Safe for the family",tr4s:"Gentle on sensitive skin",bar1:"Made in Jordan · 99% natural formulations",bar2:"Order in seconds on WhatsApp — delivery across Jordan",bar3:"Free from sulfates & parabens · Safe for sensitive skin",
 nShop:"Shop",nLine:"The Line",nEssence:"Essence",nAbout:"About",nFaq:"FAQ",nContact:"Contact",
 mnEyebrow:"Explore Olga",mnShopD:"The full natural collection",mnShopGo:"Shop now",mnLineD:"Signature soaps & gift sets",mnEssenceD:"Olive oil, shea butter & laurel",mnAboutD:"Our story · Made in Jordan",mnFaqD:"Ordering, delivery & care",mnContactD:"Call, visit or message us",mnWa:"Order on WhatsApp",mnNote:"99% natural · Made in Jordan",
 aSearch:"Search products",aBag:"Shopping bag",aMenu:"Open menu",aClose:"Close",aSort:"Sort products",aPrev:"Previous",aNext:"Next",aWa:"Chat with Olga on WhatsApp",
 heroKicker:"Natural Products · Made in Jordan",heroSub:"Liquid soaps and care crafted from olive oil, laurel, shea butter and Moroccan oils — the wisdom of our grandparents, made for today.",
 ctaShop:"Shop the collection",ctaWa:"Order on WhatsApp",
 ch1n:"I · The Olive",ch1t:'Born in the <span class="it oil-text">olive groves</span>',ch1p:"Pure olive oil — the heart of the Levantine Nabulsi soap tradition.",
 ch2n:"II · The Pour",ch2t:'Liquid <span class="it oil-text">gold,</span> slowly',ch2p:"Natural oils folded gently into a pure base until the texture turns to silk.",
 ch3n:"III · The Ritual",ch3t:'Care you can <span class="it oil-text">feel</span>',ch3p:"Gentle even with frequent washing — soft, hydrated skin, every single day.",
 ch4k:"The purity of nature… in every touch",ch4t:'The <b>OLGA</b> <span class="it oil-text">Line</span>',
 heroMeta:"Olive · Laurel · Shea · Moroccan oils",scroll:"Scroll",skipFilm:"Skip to shop",
 marquee:["<b>99%</b> natural","Safe for sensitive skin","Sulfate & paraben free","Eco-friendly","Made in Jordan","Extracted from natural oils"],
 purT:'The purity of nature… <span class="it c-olive">in every touch</span>',purP:"Natural personal and home care products, 99% naturally derived. From the heart of Jordan, to every home seeking purity.",
 st1:"Naturally derived",st2:"Product families",st3:"Made in Jordan",
 ingr:["Pure olive oil","Laurel oil","Shea butter","Moroccan oils"],
 shopT:'Our premium <b>natural</b> products',shopSub:'Our Premium Natural Products <span style="opacity:.55">|</span> <span lang="ar" dir="rtl">منتجاتنا المميزة</span>',
 shopP:"Choose a size, add to your bag and send your order on WhatsApp — our team confirms delivery with you.",
 cat_all:"All",cat_body:"Hand & shower",cat_laundry:"Laundry",cat_hammam:"Hammam",cat_sets:"Gift sets",
 sort_featured:"Featured",sort_low:"Price: low to high",sort_high:"Price: high to low",searchPh:"Search products…",noResults:"No products match your search.",
 addBag:"Add to bag",add:"Add",inBag:"in bag",quick:"Quick view",view3d:"View in 3D",tap3d:"Tap for 3D · 360°",
 promoT:'Wholesale &amp; <b>business</b>',promoP:"For trade partnerships and wholesale orders, BatteL Natural Industries is happy to hear from you.",promoBtn:"Contact BatteL",
 lineK:"OLGA Line · The catalogue",lineT:'Every formula, <span class="it c-olive">page by page</span>',lineP:"A carefully developed collection, made from the purest and most effective ingredients — natural philosophy meets modern innovation.",
 lPremium:"Our Premium Natural Products",lIng:"Ingredients",lExtract:"Extracted from natural oils",lHand:"Hand wash & shower soap",lNatural:"100% natural",
 essK:"The Essence",essT:'Four gifts of <span class="it oil-text">nature</span>',
 e1t:"Pure Olive Oil",e1p:"The heart of Nabulsi soap — rich, nourishing and true to Levantine tradition.",
 e2t:"Laurel Oil",e2p:"Known for its purifying and soothing properties — suitable for all skin types.",
 e3t:"Shea Butter",e3p:"Deep moisture that protects skin from dryness and leaves it soft all day.",
 e4t:"Moroccan Oils",e4p:"Inspired by authentic Moroccan beauty rituals — for radiant, softer skin.",
 whyK:"Why choose Olga",whyT:'Natural care, <span class="it c-olive">without compromise</span>',
 w1t:"99% natural formulations",w1p:"Extracted from olive oil, laurel, shea butter and Moroccan oils.",
 w2t:"Safe for sensitive skin",w2p:"Gentle enough for the whole family — even children.",
 w3t:"Free from sulfates & parabens",w3p:"Clean formulas that respect your skin.",
 w4t:"Eco-friendly",w4p:"Our commitment to nature is part of who we are.",
 w5t:"Professional-grade quality",w5p:"Tailored for local and Arab markets.",
 w6t:"From the heart of Jordan",w6p:"Developed and manufactured by BatteL Natural Industries, Jordan.",
 abK:"About us",abT:'From the heart of Jordan, <span class="it c-olive">to every home</span>',abWho:"Made in Jordan with purity at heart",
 abStory:"BatteL is a leading Jordanian company in the natural industries sector. We develop and manufacture high-quality, safe and effective personal and home care products derived from nature — proudly combining scientific innovation with authentic natural heritage: pure olive oil, laurel oil, shea butter and traditional Moroccan oils.",
 mT:"Our Mission",mP:"To deliver advanced care solutions inspired by nature, backed by the highest standards of quality and health, and tailored to the needs of local and regional markets.",
 vT:"Our Vision",vP:"To become the leading name in the Arab world’s natural products industry through continuous innovation, smart expansion and sustainable relationships with our customers.",
 valT:"Our Core Values",vals:[["Excellence in quality","nothing less than the best"],["Integrity & transparency","trust is built on honesty"],["Sustainable innovation","we innovate with the future in mind"],["Customer focus","your satisfaction comes first"],["Respect for nature","part of our identity"]],
 rlT:'Moments of <span class="it oil-text">Olga</span>',rlCta:"Follow on Instagram",rtK:"The result on your skin",rtT:'From dry <span class="it oil-text">to hydrated</span>',rtP:"Olga Liquid Laurel Soap cleanses gently and helps keep your skin soft and hydrated — day after day.",rtOff:"Dry skin",rtOffS:"Tight, rough, flaky",rtOn:"Hydration",rtOnS:"Soft, smooth, comfortable",rtP1:"Extracted from olive oil",rtP2:"For hands & shower",rtP3:"Natural ingredients",rtCta:"Shop Laurel Soap",rtCap:"Dry skin off · Hydration on — Olga Liquid Laurel Soap",lkZoom:"Enlarge photo",lkClose:"Close",gfK:"The Olga Box · Moments to gift",gfT:'A gift <span class="it oil-text">opened with love</span>',gfP:"A luxurious green box holding three bottles — laurel, shea and nabulsi — carried in an Olga bag with golden handles. Small details that make a moment to remember.",gf1:"A gift in hand",gf2:"On velvet",gf3:"A touch of shea",gf4:"The unboxing",gf5:"In the spotlight",gf6:"Morning light",gfF1:"Three 300 ml bottles",gfF2:"A box patterned with the Olga mark",gfF3:"Gift bag with golden handles",gfCta:"Shop the collection",watch:"Watch on Instagram →",
 fqK:"FAQ",fqT:'Good to <span class="it c-olive">know</span>',fqP:"Can’t find your answer? Message us on WhatsApp — we usually reply the same day.",
 faq:[["How do I place an order?","Add products to your bag, tap Checkout, fill in your delivery details and send the order on WhatsApp. Our team confirms the delivery fee, timing and payment with you directly."],
      ["Do you deliver across Jordan?","Yes. Once you send your order on WhatsApp, we confirm the delivery details and fee for your area."],
      ["Are the products suitable for sensitive skin?","Our formulations are 99% natural, free from sulfates and parabens and safe for sensitive skin. The Nabulsi Laundry Soap is ideal for children’s clothing."],
      ["What sizes are available?","Nabulsi, Shea Butter and Laurel liquid soaps come in 300 ml and 900 ml. The Nabulsi Laundry Soap comes in an 1800 g bottle."],
      ["Do you offer wholesale?","Yes. For trade partnerships and wholesale orders, contact BatteL Natural Industries on +962 79 673 8495 or batte.jor9@gmail.com."]],
 ctT:'Let’s talk <span class="it">nature</span>',ctP:"Because your skin deserves the best of nature.",
 cc1T:"Orders & questions",cc1P:"Talk to the Olga team directly.",cc2T:"Wholesale · BatteL",cc2P:"For trade partnerships and wholesale orders.",
 lPhone:"Phone",lEmail:"Email",lWeb:"Website",
 cfT:"Send us a message",cfP:"Your message opens directly in WhatsApp.",fName:"Your name",fPhoneOpt:"Phone (optional)",fMsg:"How can we help?",fSend:"Send via WhatsApp",
 ftP:"Natural soaps and care extracted from natural oils — by BatteL Natural Industries, Jordan.",ftShop:"Shop",ftFollow:"Follow",ftRights:"All rights reserved",ftMade:"The purity of nature… in every touch",
 bagT:"Your bag",item:"item",items:"items",emptyT:"Your bag is waiting",emptyP:"Discover natural care from the olive groves.",explore:"Explore the collection",
 subtotal:"Subtotal",delivery:"Delivery",deliveryV:"Confirmed on WhatsApp",total:"Total",checkout:"Checkout",secureNote:"Ordering through WhatsApp · Delivery across Jordan",
 back:"← Back to bag",delT:"Delivery details",delP:"Complete your details and we’ll send your order to Olga on WhatsApp.",
 oName:"Full name *",oPhone:"Mobile number *",oCity:"City",oLoc:"Delivery location *",oNotes:"Notes",oPay:"Payment method *",
  eName:"Please enter your full name (first and last name).",ePhone:"Enter a valid Jordanian mobile: 9 digits starting with 77, 78 or 79.",eLoc:"Please pin your delivery location on the map.",ePay:"Please choose a payment method.",phHint:"9 digits · starts with 7",
  locBtn:"Pin your location on the map",locBtnS:"Tap to open the map and drop the pin at your door",locSet:"Delivery location pinned",locChange:"Change",locOpen:"Open map",
  mapT:"Choose delivery location",mapP:"Tap the map or drag the pin to your exact door.",mapSearch:"Search an area or street…",mapGo:"Search",mapMe:"My location",mapConfirm:"Confirm location",mapPick:"Tap the map to drop your pin",mapLoading:"Loading map…",mapFail:"The map couldn’t load. Check your connection and try again.",mapNoRes:"No results found in Jordan",mapGeoFail:"We couldn’t access your location. Enable location or pin it manually.",mapOut:"Please choose a location inside Jordan",mapAddr:"Finding address…",mapRetry:"Try again",
  pay_cod:"Cash on delivery",pay_codS:"Pay the courier when your order arrives",pay_cliq:"CliQ transfer",pay_cliqS:"We’ll send you the CliQ alias on WhatsApp",pay_wallet:"E-wallet",pay_walletS:"Zain Cash · Orange Money · other wallets",
 sendOrder:"Send order via WhatsApp",feeNote:"The delivery fee is confirmed with you on WhatsApp.",
 thanksT:"Thank you",thanksP:"Your order is ready in WhatsApp — just press send and our team will confirm delivery with you.",contShop:"Continue shopping",
 remove:"Remove",upsell:"Complete your ritual",added:"added to your bag",viewBag:"View bag",
 o3dHint:"⟲ Drag to rotate 360° · Scroll / pinch to zoom",pauseRot:"Pause rotation",autoRot:"Auto rotate",fullDetails:"Full details",preparing:"Preparing 3D…",no3d:"3D view unavailable",
 waHello:"Hello Olga 🌿\nI would like to place an order:",waName:"Name",waPhone:"Mobile",waCity:"City",waAddr:"Address",waNotes:"Notes",waLoc:"Delivery location",waMap:"Map",waPay:"Payment",
 cur:"JOD",title:"Olga — Natural Products Extracted From Natural Oils · Made in Jordan",
 desc:"Olga natural liquid soaps by BatteL Natural Industries: Nabulsi olive oil, shea butter, laurel, Nabulsi laundry soap and Moroccan hammam soap. 99% natural, made in Jordan. Order on WhatsApp."
},
ar:{
 skip:"انتقل إلى المتجر",heroAria:"أولغا — منتجات مميزة",hbFrom:"يبدأ من",hbMore:"اكتشف المنتج",hb1k:"الأصلي · نابلسي",hb1t:'ذهب الزيتون… <em>بين يديك</em>',hb1d:"صابون نابلسي سائل بزيت الزيتون النقي — ترطيب فائق ونعومة استثنائية لليدين والجسم.",hb2k:"ترطيب عميق · الشيا",hb2t:'نعومة <em>تدوم طوال اليوم</em>',hb2d:"غني بزبدة الشيا الطبيعية ليحمي بشرتك من الجفاف ويمنحها نعومة وانتعاشًا يدوم.",hb3k:"منقٍّ ومهدّئ · الغار",hb3t:'نقاء <em>زيت الغار</em>',hb3d:"تركيبة طبيعية بزيت الغار المعروف بخصائصه المطهّرة والمهدّئة — لجميع أنواع البشرة.",hb4k:"تقشير وديتوكس · الحمّام المغربي",hb4t:'طقس الحمّام المغربي <em>في بيتك</em>',hb4d:"صابون تقليدي غني بالزيوت المغربية الطبيعية، يعزّز إشراقة البشرة ونعومتها.",hb5k:"الأوفر · مجموعة المنزل",hb5t:'عناية طبيعية <em>لكل زاوية في بيتك</em>',hb5d:"ست عبوات من صابون أولغا السائل لكل مغسلة وحمّام — الخيار الأوفر للعائلة.",shopK:"مجموعة أولغا · المتجر",tr1t:"طبيعي 99%",tr1s:"بدون سلفات أو بارابين",tr2t:"توصيل لكل مناطق الأردن",tr2s:"نؤكد التفاصيل معك عبر واتساب",tr3t:"اطلب خلال ثوانٍ",tr3s:"إتمام الطلب مباشرة على واتساب",tr4t:"آمن للعائلة",tr4s:"لطيف على البشرة الحساسة",bar1:"صُنع في الأردن · تركيبات طبيعية بنسبة 99%",bar2:"اطلب خلال ثوانٍ عبر واتساب — توصيل لجميع مناطق المملكة",bar3:"بدون سلفات أو بارابين · آمن للبشرة الحساسة",
 nShop:"المتجر",nLine:"مجموعة أولغا",nEssence:"المكوّنات",nAbout:"من نحن",nFaq:"الأسئلة",nContact:"تواصل معنا",
 mnEyebrow:"تصفّح أولغا",mnShopD:"مجموعتنا الطبيعية كاملة",mnShopGo:"تسوّق الآن",mnLineD:"صابون أولغا المميّز وأطقم الهدايا",mnEssenceD:"زيت الزيتون، زبدة الشيا والغار",mnAboutD:"قصتنا · صُنع في الأردن",mnFaqD:"الطلب، التوصيل وطريقة الاستخدام",mnContactD:"اتصل بنا، زرنا أو راسلنا",mnWa:"اطلب عبر واتساب",mnNote:"طبيعي 99% · صُنع في الأردن",
 aSearch:"ابحث عن منتج",aBag:"سلة التسوق",aMenu:"القائمة",aClose:"إغلاق",aSort:"ترتيب المنتجات",aPrev:"السابق",aNext:"التالي",aWa:"تحدث مع أولغا عبر واتساب",
 heroKicker:"منتجات طبيعية · صُنع في الأردن",heroSub:"صابون سائل ومنتجات عناية من زيت الزيتون والغار وزبدة الشيا والزيوت المغربية — خبرة الأجداد يتوارثها الأحفاد.",
 ctaShop:"تسوّق المجموعة",ctaWa:"اطلب عبر واتساب",
 ch1n:"I · الزيتون",ch1t:'وُلد في <span class="it oil-text">حقول الزيتون</span>',ch1p:"زيت الزيتون النقي — قلب تقاليد الصابون النابلسي الأصيل.",
 ch2n:"II · السكب",ch2t:'ذهبٌ <span class="it oil-text">سائل</span> بهدوء',ch2p:"زيوت طبيعية تُمزج بلطف مع ماء نقي حتى يصبح القوام كالحرير.",
 ch3n:"III · طقس كل يوم",ch3t:'عناية <span class="it oil-text">تشعر بها</span>',ch3p:"لطيف حتى مع الاستخدام المتكرر — بشرة ناعمة ورطبة كل يوم.",
 ch4k:"نقاء الطبيعة… في كل لمسة",ch4t:'مجموعة <span class="it oil-text">أولغا</span>',
 heroMeta:"زيتون · غار · شيا · زيوت مغربية",scroll:"مرّر",skipFilm:"تخطَّ إلى المتجر",
 marquee:["طبيعي <b>99%</b>","آمن للبشرة الحساسة","بدون سلفات أو بارابين","صديق للبيئة","صُنع في الأردن","مستخلص من زيوت طبيعية"],
 purT:'نقاء الطبيعة… <span class="it c-olive">في كل لمسة</span>',purP:"منتجات طبيعية للعناية الشخصية والمنزلية، طبيعية بنسبة 99%. من قلب الأردن، إلى كل بيت يبحث عن النقاء.",
 st1:"طبيعية المصدر",st2:"عائلات منتجات",st3:"صُنع في الأردن",
 ingr:["زيت الزيتون النقي","زيت الغار","زبدة الشيا","الزيوت المغربية"],
 shopT:'منتجاتنا <b>الطبيعية</b> المميزة',shopSub:'منتجاتنا المميزة <span style="opacity:.55">|</span> <span class="ltr" lang="en">Our Premium Natural Products</span>',
 shopP:"اختر الحجم، أضف إلى سلّتك، وأرسل طلبك عبر واتساب — وفريقنا يؤكد التوصيل معك.",
 cat_all:"الكل",cat_body:"للأيدي والاستحمام",cat_laundry:"غسيل الملابس",cat_hammam:"الحمّام المغربي",cat_sets:"مجموعات",
 sort_featured:"المميّز",sort_low:"السعر: من الأقل",sort_high:"السعر: من الأعلى",searchPh:"ابحث عن منتج…",noResults:"لا توجد منتجات مطابقة لبحثك.",
 addBag:"أضف إلى السلة",add:"أضف",inBag:"في السلة",quick:"نظرة سريعة",view3d:"عرض ثلاثي الأبعاد",tap3d:"اضغط للعرض 3D · 360°",
 promoT:'الجملة و<b>الأعمال</b>',promoP:"للتعاون التجاري وطلبات الجملة، يسعد شركة باتل للصناعات الطبيعية تواصلكم.",promoBtn:"تواصل مع باتل",
 lineK:"مجموعة أولغا · الكتالوج",lineT:'كل تركيبة، <span class="it c-olive">صفحةً بصفحة</span>',lineP:"مجموعة مميزة طُوّرت بعناية لتمنحك تجربة طبيعية راقية، مستخلصة من أنقى المكونات وأكثرها فاعلية.",
 lPremium:"منتجاتنا المميزة",lIng:"المكونات",lExtract:"مستخلص من زيوت طبيعية",lHand:"غسول للأيدي وصابون استحمام",lNatural:"طبيعي 100%",
 essK:"الجوهر",essT:'أربع هدايا من <span class="it oil-text">الطبيعة</span>',
 e1t:"زيت الزيتون النقي",e1p:"قلب الصابون النابلسي — غني ومغذٍّ ووفيّ للتقاليد الأصيلة.",
 e2t:"زيت الغار",e2p:"معروف بخصائصه المطهّرة والمهدّئة — مناسب لجميع أنواع البشرة.",
 e3t:"زبدة الشيا",e3p:"ترطيب عميق يحمي البشرة من الجفاف ويمنحها نعومة تدوم.",
 e4t:"الزيوت المغربية",e4p:"مستوحاة من طقوس الجمال المغربي الأصيل — لإشراقة ونعومة البشرة.",
 whyK:"ليش تختار أولغا؟",whyT:'عناية طبيعية <span class="it c-olive">بلا تنازلات</span>',
 w1t:"تركيبات طبيعية بنسبة 99%",w1p:"مستخلصة من زيت الزيتون والغار وزبدة الشيا والزيوت المغربية.",
 w2t:"آمنة للبشرة الحساسة",w2p:"لطيفة على جميع أفراد العائلة، حتى الأطفال.",
 w3t:"بدون سلفات أو بارابين",w3p:"تركيبات نظيفة تحترم بشرتك.",
 w4t:"صديقة للبيئة",w4p:"التزامنا بالطبيعة جزء من هويتنا.",
 w5t:"جودة مهنية",w5p:"تلائم السوق المحلي والعربي.",
 w6t:"من قلب الأردن",w6p:"تطوير وتصنيع شركة باتل للصناعات الطبيعية – الأردن.",
 abK:"من نحن؟",abT:'من قلب الأردن، <span class="it c-olive">إلى كل بيت</span>',abWho:"صُنع في الأردن بنقاء",
 abStory:"شركة باتل هي شركة أردنية رائدة في مجال الصناعات الطبيعية، متخصصة في تطوير وتصنيع منتجات العناية الشخصية والمنزلية بجودة عالية وفعالية آمنة مستخلصة من الطبيعة. منذ تأسيسنا حرصنا على مزج الابتكار العلمي مع التراث الطبيعي الأصيل: زيت الزيتون النقي، زيت الغار، زبدة الشيا، والزيوت المغربية.",
 mT:"رسالتنا",mP:"أن نقدم حلولًا متطورة في مجال العناية مستوحاة من الطبيعة، مدعومة بأعلى معايير الجودة والصحة، وبما يلبي احتياجات السوقين المحلي والإقليمي.",
 vT:"رؤيتنا",vP:"أن نكون الاسم الأول في العالم العربي في قطاع الصناعات الطبيعية، عبر الابتكار المستمر، والتوسع الذكي، وبناء علاقات مستدامة مع عملائنا.",
 valT:"قيمنا الأساسية",vals:[["التميّز في الجودة","لا نقبل إلا بأعلى المعايير"],["النزاهة والشفافية","الثقة تُبنى بالصدق"],["الابتكار المستدام","نطوّر لنلبي المستقبل"],["التركيز على العميل","رضا العميل هو الأولوية"],["احترام البيئة","التزامنا بالطبيعة جزء من هويتنا"]],
 rlT:'لحظات <span class="it oil-text">أولغا</span>',rlCta:"تابعنا على إنستغرام",rtK:"النتيجة على بشرتك",rtT:'من الجفاف <span class="it oil-text">إلى الترطيب</span>',rtP:"صابون الغار السائل من أولغا ينظّف بلطف ويحافظ على نعومة بشرتك وترطيبها، يومًا بعد يوم.",rtOff:"جفاف البشرة",rtOffS:"شدّ وخشونة وتقشّر",rtOn:"الترطيب",rtOnS:"نعومة وراحة طوال اليوم",rtP1:"مستخلص من زيت الزيتون",rtP2:"للأيدي والاستحمام",rtP3:"مكوّنات طبيعية",rtCta:"تسوّق صابون الغار",rtCap:"وداعًا للجفاف، أهلًا بالترطيب — صابون الغار السائل من أولغا",lkZoom:"تكبير الصورة",lkClose:"إغلاق",gfK:"صندوق أولغا · لحظات تُهدى",gfT:'هديّة <span class="it oil-text">تُفتح بحب</span>',gfP:"علبة خضراء فاخرة تضم ثلاث عبوات من الغار والشيا والنابلسي، في كيس أولغا بمقابض ذهبية… تفاصيل صغيرة تصنع لحظة لا تُنسى.",gf1:"هديّة بين يديك",gf2:"على المخمل",gf3:"لمسة الشيا",gf4:"لحظة الفتح",gf5:"تحت الضوء",gf6:"ضوء الصباح",gfF1:"ثلاث عبوات 300 مل",gfF2:"علبة مزخرفة بشعار أولغا",gfF3:"كيس هدية بمقابض ذهبية",gfCta:"تسوّق المجموعة",watch:"شاهد على إنستغرام ←",
 fqK:"أسئلة شائعة",fqT:'معلومات <span class="it c-olive">تهمّك</span>',fqP:"لم تجد إجابتك؟ راسلنا عبر واتساب — نرد عادةً في نفس اليوم.",
 faq:[["كيف أطلب؟","أضف المنتجات إلى سلّتك، اضغط «إتمام الطلب»، املأ تفاصيل التوصيل وأرسل الطلب عبر واتساب. يؤكد فريقنا معك رسوم التوصيل والموعد وطريقة الدفع مباشرة."],
      ["هل يوجد توصيل لجميع مناطق الأردن؟","نعم. بعد إرسال طلبك عبر واتساب نؤكد معك تفاصيل ورسوم التوصيل لمنطقتك."],
      ["هل المنتجات مناسبة للبشرة الحساسة؟","تركيباتنا طبيعية بنسبة 99%، بدون سلفات أو بارابين، وآمنة للبشرة الحساسة. وصابون الغسيل النابلسي مثالي لملابس الأطفال."],
      ["ما الأحجام المتوفرة؟","الصابون السائل النابلسي والشيا والغار متوفر بحجمي 300 مل و900 مل، وصابون الغسيل النابلسي بعبوة 1800 غ."],
      ["هل يوجد بيع بالجملة؟","نعم. للتعاون التجاري وطلبات الجملة تواصل مع شركة باتل على ‎+962 79 673 8495‎ أو batte.jor9@gmail.com."]],
 ctT:'لنتحدث عن <span class="it">الطبيعة</span>',ctP:"لأن بشرتكِ تستحق الأفضل من الطبيعة.",
 cc1T:"الطلبات والاستفسارات",cc1P:"تواصل مباشرة مع فريق أولغا.",cc2T:"الجملة · باتل",cc2P:"للتعاون التجاري وطلبات الجملة، يسعدنا تواصلكم معنا.",
 lPhone:"الهاتف",lEmail:"البريد الإلكتروني",lWeb:"الموقع",
 cfT:"أرسل لنا رسالة",cfP:"تُفتح رسالتك مباشرة في واتساب.",fName:"الاسم",fPhoneOpt:"الهاتف (اختياري)",fMsg:"كيف نساعدك؟",fSend:"أرسل عبر واتساب",
 ftP:"صابون ومنتجات عناية مستخلصة من الزيوت الطبيعية — من إنتاج شركة باتل للصناعات الطبيعية، الأردن.",ftShop:"المتجر",ftFollow:"تابعنا",ftRights:"جميع الحقوق محفوظة",ftMade:"نقاء الطبيعة… في كل لمسة",
 bagT:"سلّتك",item:"منتج",items:"منتجات",emptyT:"سلّتك بانتظارك",emptyP:"اكتشف العناية الطبيعية من حقول الزيتون.",explore:"تصفّح المجموعة",
 subtotal:"المجموع الفرعي",delivery:"التوصيل",deliveryV:"يُؤكَّد عبر واتساب",total:"الإجمالي",checkout:"إتمام الطلب",secureNote:"الطلب عبر واتساب · توصيل لجميع مناطق المملكة",
 back:"→ العودة إلى السلة",delT:"تفاصيل التوصيل",delP:"أكمل بياناتك وسنرسل طلبك إلى أولغا عبر واتساب.",
 oName:"الاسم الكامل *",oPhone:"رقم الموبايل *",oCity:"المدينة",oLoc:"موقع التوصيل *",oNotes:"ملاحظات",oPay:"طريقة الدفع *",
  eName:"يرجى إدخال الاسم الكامل (الاسم الأول واسم العائلة).",ePhone:"أدخل رقم موبايل أردني صحيح: 9 أرقام تبدأ بـ 77 أو 78 أو 79.",eLoc:"يرجى تحديد موقع التوصيل على الخريطة.",ePay:"يرجى اختيار طريقة الدفع.",phHint:"9 أرقام · يبدأ بـ 7",
  locBtn:"حدّد موقعك على الخريطة",locBtnS:"اضغط لفتح الخريطة وضع الدبوس على باب منزلك",locSet:"تم تحديد موقع التوصيل",locChange:"تغيير",locOpen:"فتح الخريطة",
  mapT:"حدّد موقع التوصيل",mapP:"اضغط على الخريطة أو اسحب الدبوس إلى موقعك بدقّة.",mapSearch:"ابحث عن منطقة أو شارع…",mapGo:"بحث",mapMe:"موقعي الحالي",mapConfirm:"تأكيد الموقع",mapPick:"اضغط على الخريطة لوضع الدبوس",mapLoading:"جارٍ تحميل الخريطة…",mapFail:"تعذّر تحميل الخريطة. تحقّق من اتصالك بالإنترنت وحاول مجددًا.",mapNoRes:"لم نجد نتائج داخل الأردن",mapGeoFail:"تعذّر الوصول إلى موقعك. فعّل خدمة الموقع أو حدّده يدويًا.",mapOut:"يرجى اختيار موقع داخل الأردن",mapAddr:"جارٍ تحديد العنوان…",mapRetry:"إعادة المحاولة",
  pay_cod:"الدفع نقدًا عند الاستلام",pay_codS:"ادفع للمندوب عند وصول طلبك",pay_cliq:"تحويل كليك CliQ",pay_cliqS:"نرسل لك اسم المستخدم (Alias) عبر واتساب",pay_wallet:"محفظة إلكترونية",pay_walletS:"زين كاش · أورنج موني · محافظ أخرى",
 sendOrder:"أرسل الطلب عبر واتساب",feeNote:"رسوم التوصيل تُؤكَّد معك عبر واتساب.",
 thanksT:"شكرًا لك",thanksP:"طلبك جاهز في واتساب — فقط اضغط إرسال وسيؤكد فريقنا التوصيل معك.",contShop:"متابعة التسوق",
 remove:"إزالة",upsell:"أكمل طقس العناية",added:"أُضيف إلى سلّتك",viewBag:"عرض السلة",
 o3dHint:"⟲ اسحب للتدوير 360° · مرّر أو اقرص للتكبير",pauseRot:"إيقاف الدوران",autoRot:"تدوير تلقائي",fullDetails:"التفاصيل الكاملة",preparing:"جارٍ تجهيز العرض…",no3d:"العرض ثلاثي الأبعاد غير متاح",
 waHello:"مرحبًا أولغا 🌿\nأرغب بطلب ما يلي:",waName:"الاسم",waPhone:"الموبايل",waCity:"المدينة",waAddr:"العنوان",waNotes:"ملاحظات",waLoc:"موقع التوصيل",waMap:"الخريطة",waPay:"طريقة الدفع",
 cur:"د.أ",title:"أولغا — منتجات طبيعية مستخلصة من زيوت طبيعية · صُنع في الأردن",
 desc:"صابون أولغا السائل الطبيعي من شركة باتل للصناعات الطبيعية: نابلسي بزيت الزيتون، زبدة الشيا، الغار، صابون الغسيل النابلسي وصابون الحمّام المغربي. طبيعي 99%، صُنع في الأردن. اطلب عبر واتساب."
}};

/* ---------- 8) المساعدة «شمس» · Shams assistant ---------- */
var assistant={
 /* معلومات المتجر التي تجيب منها شمس عند عدم توفر الذكاء الاصطناعي */
 knowledge:{
 "whatsapp": "https://wa.me/962792000155",
 "order": {
  "ar": "الطلب سهل: ضيفي المنتجات للسلة، اضغطي «إتمام الطلب»، عبّي تفاصيل التوصيل وابعتي الطلب على واتساب. فريق أولغا بيأكد معك رسوم التوصيل والموعد وطريقة الدفع، والتوصيل لكل مناطق الأردن 🚚",
  "en": "Ordering is easy: add products to your bag, tap Checkout, fill in your delivery details and send the order on WhatsApp. The Olga team confirms the delivery fee, timing and payment — delivery across Jordan 🚚"
 },
 "wholesale": {
  "ar": "لطلبات الجملة والتعاون التجاري تواصلي مع شركة باتل للصناعات الطبيعية: ‎+962 79 673 8495‎ أو batte.jor9@gmail.com",
  "en": "For wholesale and trade partnerships contact BatteL Natural Industries: +962 79 673 8495 or batte.jor9@gmail.com"
 },
 "about": {
  "ar": "أولغا من شركة باتل للصناعات الطبيعية، صُنع في الأردن. تركيباتنا طبيعية بنسبة 99%، بدون سلفات أو بارابين، وآمنة للبشرة الحساسة 🌿",
  "en": "Olga is made in Jordan by BatteL Natural Industries. Our formulations are 99% natural, free from sulfates and parabens, and safe for sensitive skin 🌿"
 },
 "products": [
  {
   "id": "nabulsi",
   "keys": [
    "nabulsi liquid",
    "nabulsi soap",
    "نابلسي سائل",
    "صابون نابلسي سائل",
    "olive",
    "زيت الزيتون",
    "الزيتون"
   ],
   "name": {
    "en": "Nabulsi Liquid Soap",
    "ar": "صابون نابلسي سائل"
   },
   "desc": {
    "en": "Olive-oil hand wash & shower soap for deep hydration and softness.",
    "ar": "غسول للأيدي وصابون استحمام بزيت الزيتون، ترطيب فائق ونعومة."
   },
   "variants": [
    {
     "size": {
      "en": "300 ml",
      "ar": "300 مل"
     },
     "price": 3.5
    },
    {
     "size": {
      "en": "900 ml",
      "ar": "900 مل"
     },
     "price": 6.5
    }
   ]
  },
  {
   "id": "shea",
   "keys": [
    "shea butter liquid",
    "shea soap",
    "الشيا السائل",
    "صابون الشيا",
    "زبدة الشيا",
    "بزبدة الشيا"
   ],
   "name": {
    "en": "Shea Butter Liquid Soap",
    "ar": "صابون سائل بزبدة الشيا"
   },
   "desc": {
    "en": "Deep moisture that protects skin from dryness.",
    "ar": "ترطيب عميق يحمي البشرة من الجفاف."
   },
   "variants": [
    {
     "size": {
      "en": "300 ml",
      "ar": "300 مل"
     },
     "price": 3.5
    },
    {
     "size": {
      "en": "900 ml",
      "ar": "900 مل"
     },
     "price": 6.5
    }
   ]
  },
  {
   "id": "laurel",
   "keys": [
    "laurel",
    "غار"
   ],
   "name": {
    "en": "Liquid Laurel Soap",
    "ar": "صابون غار سائل"
   },
   "desc": {
    "en": "Laurel oil — purifying, soothing, for all skin types.",
    "ar": "بزيت الغار — مطهّر ومهدّئ ومناسب لجميع أنواع البشرة."
   },
   "variants": [
    {
     "size": {
      "en": "300 ml",
      "ar": "300 مل"
     },
     "price": 3.5
    },
    {
     "size": {
      "en": "900 ml",
      "ar": "900 مل"
     },
     "price": 6.5
    }
   ]
  },
  {
   "id": "laundry",
   "keys": [
    "laundry",
    "غسيل",
    "الغسيل"
   ],
   "name": {
    "en": "Nabulsi Laundry Soap",
    "ar": "صابون نابلسي لغسيل الملابس"
   },
   "desc": {
    "en": "Removes tough stains, keeps fabrics soft, ideal for children’s clothes.",
    "ar": "يزيل البقع الصعبة ويحافظ على نعومة الأقمشة، مثالي لملابس الأطفال."
   },
   "variants": [
    {
     "size": {
      "en": "1800 g",
      "ar": "1800 غ"
     },
     "price": 4.5
    }
   ]
  },
  {
   "id": "moroccan",
   "keys": [
    "moroccan",
    "hammam",
    "المغربي",
    "الحمام المغربي",
    "الحمّام المغربي"
   ],
   "name": {
    "en": "Moroccan Hammam Soap",
    "ar": "صابون الحمّام المغربي"
   },
   "desc": {
    "en": "Natural Moroccan oils for deep cleansing, detox and radiance.",
    "ar": "زيوت مغربية طبيعية لتنظيف عميق وتقشير وإشراقة."
   },
   "variants": [
    {
     "size": {
      "en": "Jar · gift box",
      "ar": "علبة · صندوق هدية"
     },
     "price": 5.0
    }
   ]
  },
  {
   "id": "shea-duo",
   "keys": [
    "shea ritual duo",
    "shea duo",
    "ثنائي الشيا"
   ],
   "name": {
    "en": "Shea Ritual Duo",
    "ar": "ثنائي الشيا"
   },
   "desc": {
    "en": "Shea 300 ml + 900 ml — a lovely gift.",
    "ar": "شيا 300 مل + 900 مل — هدية مميزة."
   },
   "variants": [
    {
     "size": {
      "en": "2 bottles",
      "ar": "عبوتان"
     },
     "price": 9.5
    }
   ]
  },
  {
   "id": "home-set",
   "keys": [
    "home set",
    "مجموعة أولغا للمنزل",
    "مجموعة المنزل",
    "6 عبوات",
    "6 bottles"
   ],
   "name": {
    "en": "The Olga Home Set",
    "ar": "مجموعة أولغا للمنزل"
   },
   "desc": {
    "en": "Six bottles of shea liquid soap — best value for families.",
    "ar": "ست عبوات من صابون الشيا السائل — الخيار الأوفر للعائلات."
   },
   "variants": [
    {
     "size": {
      "en": "6 bottles",
      "ar": "6 عبوات"
     },
     "price": 19.0
    }
   ]
  }
 ]
},
 /* جمل الجولة في الأقسام (لها تسجيلات صوتية بنفس المفتاح في shams-voice-tour.js) */
 tourLines:{
 "t.hero.0": {
  "g": "wave",
  "ar": "يا هلا ومرحبا فيكِ! أنا شمس، وأهلاً بكِ في عالم أولغا.",
  "en": "Hello and welcome! I'm Shams, and this is the world of Olga."
 },
 "t.hero.1": {
  "g": "open",
  "ar": "منتجات طبيعية مستخلصة من زيت الزيتون والغار وزبدة الشيا والزيوت المغربية، مصنوعة في الأردن بكل حب.",
  "en": "Natural products extracted from olive oil, laurel, shea butter and Moroccan oils, lovingly made in Jordan."
 },
 "t.hero.2": {
  "g": "present",
  "ar": "خليني آخذك بجولة سريعة، وكل ما توصلي لقسم جديد، بشرحلك عنه.",
  "en": "Let me take you on a quick tour. Each time you reach a new section, I'll tell you all about it."
 },
 "t.purity.0": {
  "g": "open",
  "ar": "هون وعد أولغا: نقاء الطبيعة في كل لمسة.",
  "en": "This is Olga's promise: the purity of nature in every touch."
 },
 "t.purity.1": {
  "g": "count",
  "ar": "منتجاتنا للعناية الشخصية والمنزلية، طبيعية المصدر بنسبة تسعة وتسعين بالمية.",
  "en": "Our personal and home care products are ninety-nine percent naturally derived."
 },
 "t.purity.2": {
  "g": "present",
  "ar": "من قلب الأردن، لكل بيت بدوّر على النقاء.",
  "en": "From the heart of Jordan, to every home that seeks purity."
 },
 "t.shop.0": {
  "g": "present",
  "ar": "وهون المتجر! بتلاقي فيه كل منتجات أولغا مع أسعارها.",
  "en": "And here's the shop, with every Olga product and its price."
 },
 "t.shop.1": {
  "g": "count",
  "ar": "فيكِ تختاري حسب النوع: للأيدي والاستحمام، غسيل الملابس، الحمّام المغربي، أو المجموعات.",
  "en": "You can filter by type: hand and shower, laundry, Moroccan hammam, or gift sets."
 },
 "t.shop.2": {
  "g": "open",
  "ar": "اختاري الحجم، اضغطي أضف، وابعتي طلبك على واتساب، وفريقنا بيأكد معك التوصيل.",
  "en": "Choose a size, tap Add, and send your order on WhatsApp. Our team confirms delivery with you."
 },
 "t.shop.3": {
  "g": "wave",
  "ar": "وإذا محتارة شو تختاري، اسأليني وأنا بساعدك.",
  "en": "And if you're not sure what to pick, just ask me. I'm happy to help."
 },
 "t.line.0": {
  "g": "present",
  "ar": "هاي مجموعة أولغا، كل تركيبة صفحة بصفحة، متل الكتالوج.",
  "en": "This is the Olga line. Every formula, page by page, like a catalogue."
 },
 "t.line.1": {
  "g": "count",
  "ar": "صابون النابلسي السائل بزيت الزيتون، والشيا للترطيب العميق، والغار المطهّر للبشرة الحساسة.",
  "en": "Nabulsi liquid soap with olive oil, shea for deep moisture, and purifying laurel for sensitive skin."
 },
 "t.line.2": {
  "g": "open",
  "ar": "وكمان صابون الغسيل النابلسي لملابس العيلة، وصابون الحمّام المغربي لطقس تنظيف عميق.",
  "en": "Plus Nabulsi laundry soap for the family's clothes, and Moroccan hammam soap for a deep cleansing ritual."
 },
 "t.essence.0": {
  "g": "open",
  "ar": "هاد هو الجوهر: أربع هدايا من الطبيعة.",
  "en": "This is our essence: four gifts from nature."
 },
 "t.essence.1": {
  "g": "count",
  "ar": "زيت الزيتون النقي، قلب الصابون النابلسي، وزيت الغار المطهّر والمهدّئ.",
  "en": "Pure olive oil, the heart of Nabulsi soap, and soothing, purifying laurel oil."
 },
 "t.essence.2": {
  "g": "present",
  "ar": "وزبدة الشيا للترطيب العميق، والزيوت المغربية لإشراقة ونعومة البشرة.",
  "en": "Shea butter for deep moisture, and Moroccan oils for radiant, soft skin."
 },
 "t.why.0": {
  "g": "open",
  "ar": "ليش أولغا؟ لأنها عناية طبيعية بلا تنازلات.",
  "en": "Why Olga? Because it's natural care, with no compromises."
 },
 "t.why.1": {
  "g": "count",
  "ar": "آمنة للبشرة الحساسة ولكل العيلة حتى الأطفال، وبدون سلفات أو بارابين.",
  "en": "It's safe for sensitive skin and the whole family, even children, with no sulfates or parabens."
 },
 "t.why.2": {
  "g": "present",
  "ar": "صديقة للبيئة، بجودة مهنية، ومن تصنيع شركة باتل في الأردن.",
  "en": "Eco-friendly, professional quality, and made by BatteL Natural Industries in Jordan."
 },
 "t.about.0": {
  "g": "present",
  "ar": "هاي قصتنا: أولغا من شركة باتل للصناعات الطبيعية، شركة أردنية رائدة.",
  "en": "Our story: Olga comes from BatteL Natural Industries, a leading Jordanian company."
 },
 "t.about.1": {
  "g": "open",
  "ar": "بنمزج الابتكار العلمي مع التراث الطبيعي الأصيل.",
  "en": "We blend scientific innovation with authentic natural heritage."
 },
 "t.about.2": {
  "g": "count",
  "ar": "ورؤيتنا نكون الاسم الأول بالعالم العربي في الصناعات الطبيعية.",
  "en": "And our vision is to be the leading name in natural industries across the Arab world."
 },
 "t.reels.0": {
  "g": "present",
  "ar": "وهون فيديوهاتنا من إنستغرام، شوفي منتجاتنا وهي بتشتغل.",
  "en": "Here are our Instagram reels. See our products in action."
 },
 "t.reels.1": {
  "g": "wave",
  "ar": "تابعينا على إنستغرام، ليوصلك كل جديد.",
  "en": "Follow us on Instagram to catch everything new."
 },
 "t.faq.0": {
  "g": "open",
  "ar": "عندك سؤال؟ هون الأسئلة الأكثر تكراراً مع أجوبتها.",
  "en": "Got a question? Here are the most common ones, with their answers."
 },
 "t.faq.1": {
  "g": "present",
  "ar": "وإذا ما لقيتي جوابك، اكتبيلي وبجاوبك فوراً.",
  "en": "And if you don't find your answer, just write to me and I'll reply right away."
 },
 "t.contact.0": {
  "g": "present",
  "ar": "للطلبات والاستفسارات، تواصلي معنا على واتساب، وفريقنا جاهز يخدمك.",
  "en": "For orders and questions, message us on WhatsApp. Our team is ready to help."
 },
 "t.contact.1": {
  "g": "open",
  "ar": "ولطلبات الجملة، تواصلي مع شركة باتل مباشرة.",
  "en": "For wholesale, contact BatteL directly."
 },
 "t.contact.2": {
  "g": "wave",
  "ar": "شكراً إنك زرتينا، وأنا هون إذا احتجتي أي إشي.",
  "en": "Thank you for visiting. I'm right here whenever you need me."
 },
 "x.back": {
  "g": "wave",
  "ar": "أهلاً فيكِ من جديد! مبسوطة كتير إنك رجعتي.",
  "en": "Welcome back! So glad to see you again."
 },
 "x.thanks": {
  "g": "wave",
  "ar": "العفو يا قلبي، أنا هون إذا احتجتيني.",
  "en": "You're very welcome. I'm here if you need me."
 },
 "x.add1": {
  "g": "open",
  "ar": "يا سلام، اختيار موفّق!",
  "en": "Lovely choice!"
 },
 "x.add2": {
  "g": "present",
  "ar": "تمام! صار بالسلة.",
  "en": "Done! It's in your bag."
 },
 "x.chat": {
  "g": "open",
  "ar": "تفضلي، اسأليني أي إشي.",
  "en": "Go ahead, ask me anything."
 },
 "r.hi": {
  "g": "open",
  "ar": "يا هلا ومرحبا فيكِ! أنا شمس من أولغا. بساعدك تختاري الصابون الطبيعي الأنسب إلك ولعيلتك، وبجاوبك عن الأسعار والطلب والتوصيل. كيف بقدر أساعدك؟",
  "en": "Hello and welcome! I'm Shams from Olga. I'll help you choose the right natural soap for you and your family, and answer anything about prices, ordering and delivery. How can I help?"
 },
 "r.dry": {
  "g": "present",
  "ar": "للبشرة الجافة بنصحك بصابون الشيا السائل، بيرطب بعمق وبيحمي من الجفاف.",
  "en": "For dry skin I recommend the Shea Butter Liquid Soap. Deep moisture and protection from dryness."
 },
 "r.oily": {
  "g": "present",
  "ar": "صابون الغار السائل مطهّر ومهدّئ ومناسب لكل أنواع البشرة، وكل منتجاتنا بدون سلفات أو بارابين وآمنة للبشرة الحساسة.",
  "en": "Liquid Laurel Soap is purifying and soothing for all skin types, and all our products are sulfate and paraben free, safe for sensitive skin."
 },
 "r.kids": {
  "g": "present",
  "ar": "صابون الغسيل النابلسي مثالي لملابس الأطفال، بيشيل البقع الصعبة وبحافظ على نعومة الأقمشة، بدون ما يهيّج البشرة الحساسة.",
  "en": "The Nabulsi Laundry Soap is ideal for children's clothes. It lifts tough stains, keeps fabrics soft and won't irritate sensitive skin."
 },
 "r.gift": {
  "g": "open",
  "ar": "للهدايا عنا خيارات حلوة كتير.",
  "en": "We have lovely gift options."
 },
 "r.prices": {
  "g": "present",
  "ar": "هاي أسعار منتجات أولغا.",
  "en": "Here are Olga's prices."
 },
 "r.order": {
  "g": "count",
  "ar": "الطلب سهل: ضيفي المنتجات للسلة، اضغطي إتمام الطلب، عبّي تفاصيل التوصيل وابعتي الطلب على واتساب. فريق أولغا بيأكد معك رسوم التوصيل والموعد وطريقة الدفع، والتوصيل لكل مناطق الأردن.",
  "en": "Ordering is easy: add products to your bag, tap Checkout, fill in your delivery details and send the order on WhatsApp. The Olga team confirms the delivery fee, timing and payment, with delivery across Jordan."
 },
 "r.wholesale": {
  "g": "present",
  "ar": "لطلبات الجملة والتعاون التجاري، تواصلي مع شركة باتل للصناعات الطبيعية على الرقم أو الإيميل اللي قدامك.",
  "en": "For wholesale and trade partnerships, contact BatteL Natural Industries on the number or email shown here."
 },
 "r.about": {
  "g": "open",
  "ar": "أولغا من شركة باتل للصناعات الطبيعية، صُنع في الأردن. تركيباتنا طبيعية بنسبة تسعة وتسعين بالمية، بدون سلفات أو بارابين، وآمنة للبشرة الحساسة.",
  "en": "Olga is made in Jordan by BatteL Natural Industries. Our formulations are ninety-nine percent natural, free from sulfates and parabens, and safe for sensitive skin."
 },
 "r.recommend": {
  "g": "count",
  "ar": "أكيد! خبريني عن بشرتك: جافة، دهنية، ولا حساسة؟ وبشكل عام، هاي اختياراتي.",
  "en": "Of course! Tell me about your skin: dry, oily or sensitive? Meanwhile, here are my picks."
 },
 "r.fb": {
  "g": "open",
  "ar": "هاي المعلومة بيأكدها فريق أولغا مباشرة على واتساب.",
  "en": "The Olga team confirms that directly on WhatsApp."
 },
 "p.nabulsi": {
  "g": "present",
  "ar": "صابون نابلسي سائل",
  "en": "Nabulsi Liquid Soap"
 },
 "p.shea": {
  "g": "present",
  "ar": "صابون سائل بزبدة الشيا",
  "en": "Shea Butter Liquid Soap"
 },
 "p.laurel": {
  "g": "present",
  "ar": "صابون غار سائل",
  "en": "Liquid Laurel Soap"
 },
 "p.laundry": {
  "g": "present",
  "ar": "صابون نابلسي لغسيل الملابس",
  "en": "Nabulsi Laundry Soap"
 },
 "p.moroccan": {
  "g": "present",
  "ar": "صابون الحمّام المغربي",
  "en": "Moroccan Hammam Soap"
 },
 "p.shea-duo": {
  "g": "present",
  "ar": "ثنائي الشيا",
  "en": "Shea Ritual Duo"
 },
 "p.home-set": {
  "g": "present",
  "ar": "مجموعة أولغا للمنزل",
  "en": "The Olga Home Set"
 }
},
 /* شرح كل منتج عند فتحه (له تسجيلات في shams-voice-products.js) */
 productGuide:{
 "nabulsi": {
  "ar": {
   "what": "صابون نابلسي سائل أصيل، مصنوع من زيت الزيتون النقي على طريقة الصابون النابلسي التقليدية، بتركيبة سائلة عملية للاستخدام اليومي.",
   "why": [
    "غسل اليدين يومياً عند المغسلة",
    "صابون استحمام لطيف للجسم كله",
    "للعائلة كلها، الكبار والصغار"
   ],
   "ben": [
    "زيت الزيتون يرطّب البشرة ويحافظ على زيوتها الطبيعية",
    "يترك اليدين ناعمتين بدون إحساس بالجفاف بعد الغسل",
    "تنظيف لطيف وعميق بمكونات طبيعية 100%"
   ],
   "tip": "ضعي كمية صغيرة على يدين مبللتين، دلّكي حتى تتكون الرغوة ثم اشطفي. حجم 900 مل اقتصادي للحمّام، و300 مل مثالي للمغسلة."
  },
  "en": {
   "what": "An authentic Nabulsi liquid soap made from pure olive oil in the traditional Nabulsi way, in a practical liquid form for everyday use.",
   "why": [
    "Daily hand washing at the sink",
    "A gentle shower soap for the whole body",
    "For the whole family, adults and kids"
   ],
   "ben": [
    "Olive oil moisturizes and keeps the skin's natural oils",
    "Leaves hands soft with no tight, dry feeling",
    "Gentle, deep cleansing with 100% natural ingredients"
   ],
   "tip": "Lather a little on wet hands, then rinse. The 900 ml size is great value for the shower; 300 ml is perfect by the sink."
  }
 },
 "shea": {
  "ar": {
   "what": "صابون سائل غني بزبدة الشيا الطبيعية، من أكثر المكونات المعروفة بالترطيب العميق وحماية البشرة.",
   "why": [
    "للبشرة الجافة أو التي تتعرّض للجفاف في الشتاء",
    "غسول يومي لليدين وصابون استحمام",
    "لمن تحب إحساس النعومة الذي يدوم"
   ],
   "ben": [
    "ترطيب عميق يحمي البشرة من الجفاف والتشقق",
    "نعومة وانتعاش يدومان طوال اليوم",
    "تركيبة لطيفة بمكونات طبيعية 100%"
   ],
   "tip": "مثالي بعد يوم طويل: استخدميه في الاستحمام المسائي لتنامي ببشرة ناعمة ومرتاحة."
  },
  "en": {
   "what": "A liquid soap rich in natural shea butter, one of the best-known ingredients for deep moisture and skin protection.",
   "why": [
    "Dry skin, or skin that gets dry in winter",
    "Daily hand wash and shower soap",
    "Anyone who loves long-lasting softness"
   ],
   "ben": [
    "Deep moisture that protects against dryness and cracking",
    "Softness and freshness that last all day",
    "A gentle formula with 100% natural ingredients"
   ],
   "tip": "Lovely in an evening shower, so you go to bed with soft, comfortable skin."
  }
 },
 "laurel": {
  "ar": {
   "what": "صابون غار سائل بزيت الغار الأصيل، المعروف منذ القدم بخصائصه المطهّرة والمهدّئة للبشرة.",
   "why": [
    "تنظيف اليدين والجسم بإحساس النقاء",
    "للبشرة الدهنية أو المعرّضة للحبوب",
    "مناسب لجميع أنواع البشرة"
   ],
   "ben": [
    "خصائص مطهّرة تنقّي البشرة بلطف",
    "يهدّئ البشرة ويخفف إحساس التهيّج",
    "يحافظ على توازن البشرة بمكونات طبيعية 100%"
   ],
   "tip": "دلّكي الرغوة على البشرة لثوانٍ قبل الشطف لتستفيدي من زيت الغار أكثر."
  },
  "en": {
   "what": "A liquid laurel soap with authentic laurel oil, known for centuries for its purifying and soothing properties.",
   "why": [
    "Cleansing hands and body with a pure, fresh feel",
    "Oily or blemish-prone skin",
    "Suitable for all skin types"
   ],
   "ben": [
    "Purifying properties that gently cleanse the skin",
    "Soothes the skin and calms irritation",
    "Keeps the skin balanced with 100% natural ingredients"
   ],
   "tip": "Massage the lather in for a few seconds before rinsing to get the most from the laurel oil."
  }
 },
 "laundry": {
  "ar": {
   "what": "صابون نابلسي لغسيل الملابس، مستخلص من زيت الزيتون، بتركيبة لطيفة تنظّف بعمق وآمنة للبشرة الحساسة.",
   "why": [
    "غسيل ملابس الأطفال والرضّع",
    "ملابس من بشرتهم حساسة في العائلة",
    "الغسيل اليومي لكل أفراد العائلة"
   ],
   "ben": [
    "يزيل البقع الصعبة بفعالية",
    "يحافظ على نعومة الأقمشة وألوانها",
    "لا يسبب تهيّجاً للبشرة الحساسة"
   ],
   "tip": "للبقع الصعبة: افركي قليلاً منه مباشرة على البقعة واتركيه دقائق قبل الغسيل."
  },
  "en": {
   "what": "A Nabulsi laundry soap made from olive oil, with a gentle formula that cleans deeply and is safe for sensitive skin.",
   "why": [
    "Washing baby and children's clothes",
    "Family members with sensitive skin",
    "Everyday laundry for the whole family"
   ],
   "ben": [
    "Removes tough stains effectively",
    "Keeps fabrics soft and colors bright",
    "Does not irritate sensitive skin"
   ],
   "tip": "For tough stains, rub a little directly on the stain and leave it a few minutes before washing."
  }
 },
 "moroccan": {
  "ar": {
   "what": "صابون الحمّام المغربي التقليدي، غني بزيوت مغربية طبيعية ومستوحى من طقوس الجمال المغربي الأصيلة.",
   "why": [
    "طقس حمّام مغربي في البيت مرة أو مرتين أسبوعياً",
    "تنظيف عميق وتقشير للبشرة",
    "تحضير البشرة قبل المناسبات"
   ],
   "ben": [
    "تنظيف عميق يزيل الخلايا الميتة مع الكيس",
    "ديتوكس للبشرة وإشراقة واضحة",
    "نعومة فاخرة ومكونات طبيعية 100%"
   ],
   "tip": "افردي الصابون على بشرة رطبة بعد البخار، اتركيه 5 دقائق، ثم قشّري بالكيس المغربي واشطفي."
  },
  "en": {
   "what": "Traditional Moroccan hammam soap, rich in natural Moroccan oils and inspired by authentic Moroccan beauty rituals.",
   "why": [
    "A Moroccan hammam ritual at home once or twice a week",
    "Deep cleansing and exfoliation",
    "Preparing your skin before special occasions"
   ],
   "ben": [
    "Deep cleansing that lifts dead skin with a kessa glove",
    "Skin detox and visible radiance",
    "Luxurious softness with 100% natural ingredients"
   ],
   "tip": "Spread on damp skin after steam, leave 5 minutes, then exfoliate with a kessa glove and rinse."
  }
 },
 "shea-duo": {
  "ar": {
   "what": "ثنائي الشيا: عبوة 300 مل للمغسلة وعبوة 900 مل للاستحمام، طقس زبدة الشيا الكامل في مجموعة واحدة.",
   "why": [
    "هدية أنيقة لمن تحبين",
    "ترطيب متكامل لليدين والجسم",
    "تجهيز المغسلة والحمّام معاً"
   ],
   "ben": [
    "ترطيب عميق وحماية من الجفاف في كل غسلة",
    "سعر أوفر من شراء العبوتين منفصلتين",
    "تقديم جميل يناسب الهدايا"
   ],
   "tip": "ضعي الصغيرة بجانب المغسلة والكبيرة في الحمّام لتكتمل العناية اليومية."
  },
  "en": {
   "what": "The Shea Ritual Duo: a 300 ml bottle for the sink and a 900 ml bottle for the shower, the full shea butter ritual in one set.",
   "why": [
    "An elegant gift for someone you love",
    "Complete moisture for hands and body",
    "Setting up the sink and shower together"
   ],
   "ben": [
    "Deep moisture and protection from dryness with every wash",
    "Better value than buying both separately",
    "Beautiful presentation for gifting"
   ],
   "tip": "Keep the small bottle by the sink and the large one in the shower for complete daily care."
  }
 },
 "home-set": {
  "ar": {
   "what": "مجموعة أولغا للمنزل: ست عبوات من صابون أولغا السائل بزبدة الشيا، تكفي كل مغسلة وحمّام في البيت.",
   "why": [
    "العائلات الكبيرة",
    "تجهيز البيت كاملاً بعناية طبيعية",
    "المخزون الشهري بدل الشراء المتكرر"
   ],
   "ben": [
    "الخيار الأوفر في المتجر",
    "ترطيب زبدة الشيا لكل أفراد العائلة",
    "عناية طبيعية 100% في كل غرفة"
   ],
   "tip": "وزّعي العبوات على المطبخ والمغاسل والحمّامات، وما تبقى يكون مخزوناً جاهزاً."
  },
  "en": {
   "what": "The Olga Home Set: six bottles of Olga shea butter liquid soap, enough for every sink and shower in your home.",
   "why": [
    "Larger families",
    "Stocking the whole home with natural care",
    "Monthly supply instead of repeat buying"
   ],
   "ben": [
    "The best value in the store",
    "Shea butter moisture for the whole family",
    "100% natural care in every room"
   ],
   "tip": "Place bottles in the kitchen, sinks and bathrooms, and keep the rest as ready stock."
  }
 }
},
 productLabels:{
 "ar": {
  "what": "ما هو؟",
  "why": "لمن ولماذا يُستخدم؟",
  "ben": "ماذا ستستفيدين منه؟",
  "ing": "المكونات",
  "tip": "نصيحة شمس",
  "intro": "اخترتِ {n} 🌿 خليني أعرّفك عليه:",
  "price": "السعر يبدأ من"
 },
 "en": {
  "what": "What is it?",
  "why": "Who it's for & why",
  "ben": "What you'll gain",
  "ing": "Ingredients",
  "tip": "Shams's tip",
  "intro": "You picked {n} 🌿 let me tell you about it:",
  "price": "From"
 }
}
};

return {whatsapp:whatsapp, categories:categories, products:products, reels:reels, heroSlides:heroSlides,
        cities:cities, payments:payments, texts:texts, assistant:assistant};
})();
