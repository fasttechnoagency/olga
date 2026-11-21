/* =====================================================================
   OLGA · assets/data/config.js — the servers this website talks to.
   Change an address here only; the code reads these values.
   ===================================================================== */

/* Olga control panel database: orders are sent to it (place_order) and the
   delivery fees are read from it (Settings → deliveryAmman / deliveryOther).
   The key below is the PUBLIC (publishable) key — safe in a website.
   Never put a secret / service-role key in this file. */
window.OLGA_DB_URL = "https://sktmniwsdipeaocxkykz.supabase.co";
window.OLGA_DB_KEY = "sb_publishable_z3nEmyXGA5H-fKXp1NdA-w_hSwYslK2";

/* Shams AI assistant server: live chat answers (olga-chat) and her live voice (olga-tts). */
window.OLGA_HALA_API = "https://project--65110b39-c469-46d4-84e9-1232c2a3cda8.lovable.app/api/public/";
