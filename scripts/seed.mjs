// Script de seed - populeaza Supabase cu produsele si promotiile initiale
// Ruleaza: npm run db:seed
// (asigura-te ca .env.local contine SUPABASE_SERVICE_ROLE_KEY)

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("❌ Lipsesc NEXT_PUBLIC_SUPABASE_URL sau SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ============= COLECTII =============
const collections = [
  { slug: "marble", name: "Marble", description: "Marmură italiană clasică — Calacatta, Bernini, finisaje lucioase și mate.", sort_order: 1 },
  { slug: "stone", name: "Stone", description: "Plăci tip piatră naturală cu vene fine și caracter neutru.", sort_order: 2 },
  { slug: "stormy", name: "Stormy", description: "Tonuri profunde de negru cu accente metalice — pentru spații dramatice.", sort_order: 3 },
  { slug: "natural", name: "Natural", description: "Tonuri calde, organice, inspirate din lemn și pământ.", sort_order: 4 },
  { slug: "mineral", name: "Mineral", description: "Finisaje minerale, mate, cu particule fine — ideale pentru contemporan.", sort_order: 5 },
  { slug: "exotic", name: "Exotic", description: "Pietre rare din Brazilia și India — verde, mov, formate mari.", sort_order: 6 },
  { slug: "terrazzo", name: "Terrazzo", description: "Compoziții cu fragmente vizibile — clasic reinterpretat.", sort_order: 7 },
];

// ============= PRODUSE =============
// Toate cele 23 produse de pe prodclas.md cu preturile originale
const products = [
  // Marble
  { slug: "calacatta-bellini", name: "Calacatta Bellini", collection: "marble", price_mdl: 1700, origin: "Italia", size: "60×120", finish: "Lucios", description: "Marmură italiană clasică cu vene gri delicate pe fond crem-alb.", is_featured: false },
  { slug: "calacatta-black", name: "Calacatta Black", collection: "marble", price_mdl: 2000, origin: "Italia", size: "60×120", finish: "Lucios", description: "Versiune dramatică a clasicului Calacatta, cu vene aurii pe negru profund.", is_featured: false },
  { slug: "calacatta-gold", name: "Calacatta Gold", collection: "marble", price_mdl: 1800, origin: "Italia", size: "120×280", finish: "Mat", description: "Format mare, finisaj mat, ideal pentru pereți de impact și blaturi.", is_featured: true },
  { slug: "calacatta-viola", name: "Calacatta Viola", collection: "marble", price_mdl: 2100, origin: "Italia", size: "60×120", finish: "Lucios", description: "Vene mov-violete intense pe alb pur — accente îndrăznețe pentru băi de design.", is_featured: false },
  { slug: "calacatta-bernini", name: "Calacatta Bernini", collection: "marble", price_mdl: 1800, origin: "Italia", size: "60×120", finish: "Lucios", description: "Vene fine aurii pe alb cald, inspirat de sculptura Berniniana.", is_featured: false },

  // Stormy
  { slug: "black-tempest", name: "Black Tempest", collection: "stormy", price_mdl: 2100, origin: "Spania", size: "120×280", finish: "Lucios", description: "Furtună grafică în negru — format mare cu valuri argintii distincte.", is_featured: true },
  { slug: "black-atlantis", name: "Black Atlantis", collection: "stormy", price_mdl: 1800, origin: "Italia", size: "60×120", finish: "Lucios", description: "Negru profund cu vene aurii geometrice.", is_featured: false },
  { slug: "nero-marquina", name: "Nero Marquina", collection: "stormy", price_mdl: 1800, origin: "Italia", size: "60×120", finish: "Lucios", description: "Clasicul marmură spaniolă neagră cu vene albe — atemporal.", is_featured: false },

  // Natural
  { slug: "zephyr", name: "Zephyr", collection: "natural", price_mdl: 2000, origin: "Italia", size: "60×120", finish: "Mat", description: "Tonuri calde de pământ cu vene organice — vânt deșertic transpus în piatră.", is_featured: false },
  { slug: "natural-kaolin", name: "Natural Kaolin", collection: "natural", price_mdl: 1900, origin: "Spania", size: "60×120", finish: "Mat", description: "Crem pur cu textură fină — neutru perfect pentru orice paletă.", is_featured: false },
  { slug: "natural-roots", name: "Natural Roots", collection: "natural", price_mdl: 2000, origin: "Italia", size: "60×120", finish: "Mat", description: "Vene de scoarță și nuanțe de pământ — caracter rustic-contemporan.", is_featured: false },
  { slug: "emic-alpinus", name: "Emic Alpinus", collection: "natural", price_mdl: 1800, origin: "Italia", size: "60×120", finish: "Mat", description: "Inspirat din rocile alpine — fragmente fosile vizibile.", is_featured: false },
  { slug: "appennino", name: "Appennino", collection: "natural", price_mdl: 1800, origin: "Italia", size: "60×120", finish: "Mat", description: "Tonuri de munte italian, vene subtile pe fond cald.", is_featured: false },

  // Mineral
  { slug: "mineral-smoke", name: "Mineral Smoke", collection: "mineral", price_mdl: 1900, origin: "Spania", size: "60×60", finish: "Mat", description: "Gri fum cu particule fine — minimalism industrial.", is_featured: false },
  { slug: "mineral-white", name: "Mineral White", collection: "mineral", price_mdl: 1900, origin: "Spania", size: "60×60", finish: "Mat", description: "Alb cald cu texturã granulară subtilă.", is_featured: false },
  { slug: "boost-balance-ivory", name: "Boost Balance Ivory", collection: "mineral", price_mdl: 1700, origin: "Italia", size: "60×60", finish: "Mat", description: "Ivory neutru, perfect pentru spații mari și fluiditate.", is_featured: true },

  // Stone
  { slug: "fior-di-bosco", name: "Fior Di Bosco", collection: "stone", price_mdl: 1600, origin: "Italia", size: "60×120", finish: "Lucios", description: "Gri-verzui cu vene aurii — flori de pădure în piatră.", is_featured: true },
  { slug: "taj-mahal-white", name: "Taj Mahal White", collection: "stone", price_mdl: 2100, origin: "Brazilia", size: "120×280", finish: "Mat", description: "Cuarțit brazilian alb cu venã subtilă — format mare pentru blaturi.", is_featured: false },

  // Exotic
  { slug: "desert-soul", name: "Desert Soul", collection: "exotic", price_mdl: 2000, origin: "India", size: "60×120", finish: "Mat", description: "Tonuri de chihlimbar și fragmente întunecate — sufletul deșertului.", is_featured: false },
  { slug: "ice-crystal-field", name: "Ice Crystal Field", collection: "exotic", price_mdl: 2000, origin: "Italia", size: "60×120", finish: "Lucios", description: "Vene aurii pe câmp alb-cristal — luminozitate rece.", is_featured: false },
  { slug: "exotic-wave", name: "Exotic Wave", collection: "exotic", price_mdl: 2200, origin: "Brazilia", size: "60×120", finish: "Lucios", description: "Verde adânc întâlnind alb cristalin — val exotic dramatic.", is_featured: false },
  { slug: "exotic-green", name: "Exotic Green", collection: "exotic", price_mdl: 2300, origin: "Brazilia", size: "60×120", finish: "Lucios", description: "Cel mai îndrăzneț verde din colecție — marmură premium braziliană.", is_featured: false },

  // Terrazzo
  { slug: "kone-mix", name: "Kone Mix", collection: "terrazzo", price_mdl: 1900, origin: "Italia", size: "60×60", finish: "Mat", description: "Terrazzo contemporan — fragmente naturale pe fond neutru.", is_featured: false },
];

// ============= PROMOTII =============
const promotions = [
  {
    slug: "calacatta-toamna",
    title: "Calacatta Series −20%",
    tag: "Promoție de toamnă",
    discount_label: "−20%",
    description: "Întreaga colecție Calacatta cu reducere de 20% pe stocul limitat. Marmură italiană autentică, livrare gratuită în Chișinău.",
    valid_until: "Până la 15 ianuarie",
    is_active: true,
    sort_order: 1,
  },
  {
    slug: "pachet-studio",
    title: "Pachet Studio",
    tag: "Pachet arhitecți",
    discount_label: "Acces dedicat",
    description: "Mostre gratuite, consultanță tehnică și prețuri preferențiale pentru toți membrii înregistrați în programul Arhitecți.",
    valid_until: "Permanent",
    is_active: true,
    sort_order: 2,
  },
  {
    slug: "onyx-quartz",
    title: "Onyx & Quartz",
    tag: "Colecție Exotic",
    discount_label: "Pe comandă",
    description: "Plăci de format mare 120×280, finisaje rare. Cantitate limitată, doar pe comandă specială cu preț recomandat.",
    valid_until: "Stoc limitat",
    is_active: true,
    sort_order: 3,
  },
  {
    slug: "cuponul-casei",
    title: "Cuponul casei",
    tag: "Renovare completă",
    discount_label: "−5%",
    description: "Pentru proiecte peste 50 mp aplicăm un voucher de 5% pe valoarea totală, plus consultanță cu echipa noastră de design.",
    valid_until: "Tot anul",
    is_active: true,
    sort_order: 4,
  },
];

// ============= RUN =============
async function seed() {
  console.log("🌱 Pornind seed...\n");

  // 1. Collections
  console.log("📚 Insert collections...");
  const { error: colError } = await supabase.from("collections").upsert(collections, { onConflict: "slug" });
  if (colError) {
    console.error("❌ Collections error:", colError.message);
    process.exit(1);
  }
  console.log(`   ✓ ${collections.length} colecții`);

  // Get collection IDs by slug
  const { data: cols } = await supabase.from("collections").select("id, slug");
  const colMap = Object.fromEntries(cols.map((c) => [c.slug, c.id]));

  // 2. Products
  console.log("\n🧱 Insert products...");
  const productsToInsert = products.map((p, i) => ({
    slug: p.slug,
    name: p.name,
    collection_id: colMap[p.collection],
    price_mdl: p.price_mdl,
    origin: p.origin,
    size: p.size,
    finish: p.finish,
    description: p.description,
    is_featured: p.is_featured,
    sort_order: i,
    image_url: null, // urci pozele prin admin panel
  }));

  const { error: prodError } = await supabase.from("products").upsert(productsToInsert, { onConflict: "slug" });
  if (prodError) {
    console.error("❌ Products error:", prodError.message);
    process.exit(1);
  }
  console.log(`   ✓ ${products.length} produse`);

  // 3. Promotions
  console.log("\n🏷️  Insert promotions...");
  const { error: promoError } = await supabase.from("promotions").upsert(promotions, { onConflict: "slug" });
  if (promoError) {
    console.error("❌ Promotions error:", promoError.message);
    process.exit(1);
  }
  console.log(`   ✓ ${promotions.length} promoții`);

  console.log("\n✅ Seed complet!");
  console.log("\nUrmătorul pas: porneste cu `npm run dev` si viziteaza http://localhost:3000");
  console.log("Pentru admin: http://localhost:3000/admin (logheaza-te cu user-ul creat in Supabase)");
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
