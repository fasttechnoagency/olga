/* =====================================================================
   إعدادات الاتصال بالسيرفرات — config.js
   ---------------------------------------------------------------------
   كل عناوين السيرفرات والخدمات الخارجية التي يتصل بها الموقع في مكان واحد.
   All server / external-service addresses the page talks to.

   1) shamsApi — سيرفر المساعدة «شمس» (مشروع Lovable Cloud):
        https://project--7fabf78b-6b0b-4e94-acd2-5e6b844a6811.lovable.app/api/public/olga-chat   ← ردود الذكاء الاصطناعي
        https://project--7fabf78b-6b0b-4e94-acd2-5e6b844a6811.lovable.app/api/public/olga-tts    ← صوت الردود
      إذا لم يستجب السيرفر، تجيب شمس من معلومات المتجر المحلية في content.js.
   2) map — مكتبات الخريطة وخوادم البلاطات المستخدمة في صفحة إتمام الطلب.
   3) خدمات أخرى (مكتوبة داخل script.js كما هي): البحث عن العناوين من
      nominatim.openstreetmap.org، مكتبة three.js و الخطوط من Google Fonts،
      والطلبات تُرسل عبر واتساب (الرقم في content.js).
   ===================================================================== */
window.OLGA_CONFIG={
 shamsApi:"https://project--7fabf78b-6b0b-4e94-acd2-5e6b844a6811.lovable.app/api/public/",
 map:{
  gl:{js:["https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.1/dist/maplibre-gl.js","https://unpkg.com/maplibre-gl@5.24.1/dist/maplibre-gl.js"],
      css:["https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.1/dist/maplibre-gl.css","https://unpkg.com/maplibre-gl@5.24.1/dist/maplibre-gl.css"],
      rtl:"https://cdn.jsdelivr.net/npm/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
      style:"https://tiles.openfreemap.org/styles/liberty"},
  lf:{js:["https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js","https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"],
      css:["https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css","https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"],
      tiles:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      attr:'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a> &middot; HERE, Garmin, &copy; OpenStreetMap contributors'},
  bounds:{s:28.4,w:33.9,n:34.2,e:40.3}, center:[31.9539,35.9106]
}
};
/* script.js يقرأ عنوان سيرفر شمس من هذا المتغير */
window.OLGA_HALA_API=window.OLGA_HALA_API||window.OLGA_CONFIG.shamsApi;
