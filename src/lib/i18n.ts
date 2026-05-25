// Toate textele UI in 3 limbi
// Cand adaugi text nou pe site, il pui aici si automat e disponibil in toate limbile

export type Locale = "ro" | "en" | "ru";

export const LOCALES: Locale[] = ["ro", "en", "ru"];
export const DEFAULT_LOCALE: Locale = "ro";

export const LOCALE_NAMES: Record<Locale, string> = {
  ro: "RO",
  en: "EN",
  ru: "RU",
};

export const dict = {
  ro: {
    // Nav
    nav: {
      home: "Acasă",
      products: "Produse",
      promotions: "Promoții",
      architects: "Arhitecți",
      contact: "Contacte",
      menu: "Meniu",
    },
    // Common
    common: {
      explore: "Explorează colecțiile",
      visitShowroom: "Vizitează showroom-ul",
      contactUs: "Contactează-ne",
      viewAll: "Vezi toate produsele",
      requestQuote: "Solicită ofertă",
      requestSample: "Cere mostră",
      perSqm: "/ m²",
      price: "Preț",
      origin: "Origine",
      format: "Format",
      finish: "Finisaj",
      stock: "Stoc",
      inStock: "Disponibil",
      onOrder: "Pe comandă",
      breadcrumbHome: "Acasă",
      breadcrumbProducts: "Produse",
      scrollDown: "Derulează",
      submitting: "Se trimite...",
      sendMessage: "Trimite mesajul",
      send: "Trimite",
    },
    // Home
    home: {
      eyebrow: "Maison de Ceramică · Chișinău",
      heroLine1a: "Spații",
      heroLine1b: "care",
      heroLine2a: "spun",
      heroLine2b: "povești.",
      heroDesc:
        "O selecție atent curată de gresie și faianță importată din Italia, Spania și Brazilia. Pentru locuințe, hoteluri și spații comerciale care merită să dureze.",
      stats: [
        { num: "12+", label: "Ani experiență" },
        { num: "240", label: "Modele în stoc" },
        { num: "3", label: "Țări de proveniență" },
      ],
      manifestoEyebrow: "Viziunea Prodclas",
      manifestoText:
        "Să devenim cel mai apreciat furnizor de gresie și faianță din regiune, susținuți de o echipă motivată, bine pregătită și orientată spre satisfacția fiecărui client.",
      manifestoHighlight: "gresie și faianță",
      featuredEyebrow: "Colecție nouă",
      featuredTitleA: "Selecția",
      featuredTitleB: "sezonului",
      featuredDesc:
        "Patru piese semnătură din ultimele livrări — texturi rare, formate generoase, finisaje executate cu atenție către detaliu.",
      philosophyEyebrow: "Filosofia noastră",
      philosophyTitleA: "Calitate &",
      philosophyTitleB: "estetică.",
      philosophyP1:
        "Transformă-ți spațiul cu gresie și faianță de înaltă calitate, perfecte pentru orice stil — de la rustic la modern. Fiecare placă din colecția noastră este aleasă pentru durabilitate și impact vizual, oferind soluții ideale pentru pardoseli, pereți și blaturi.",
      philosophyP2:
        "Completează-ți proiectul cu stil și autenticitate, aducând eleganță și rafinament în casa ta.",
      philosophyCta: "Vezi colecția",
      marquee: [
        "Marmură italiană",
        "Format mare 120×280",
        "Importatori autorizați",
        "Livrare în toată Moldova",
        "Consultanță arhitecturală",
      ],
      beliefsEyebrow: "De ce Prodclas",
      beliefsTitleA: "Trei",
      beliefsTitleB: "convingeri.",
      beliefs: [
        {
          title: "Sursă directă",
          body:
            "Lucrăm direct cu fabricile italiene și spaniole. Fără intermediari, fără mark-up-uri ascunse — doar marfă autentică la prețul corect.",
        },
        {
          title: "Showroom fizic",
          body:
            "Plăcile se simt cu mâna. Vino în showroom-ul nostru din Chișinău, ia mostre acasă, discută cu cineva care chiar înțelege materialul.",
        },
        {
          title: "Suport post-vânzare",
          body:
            "Recomandăm meșteri verificați, livrăm la șantier și păstrăm stocul deschis pentru completări la 6–12 luni după achiziție.",
        },
      ],
      exploreEyebrow: "Gresie și faianță",
      exploreTitleA: "Explorează",
      exploreTitleB: "produsele",
      exploreDesc:
        "Peste douăzeci de modele în stoc permanent, cu sute de variații în comandă specială. Filtrează după colecție, format sau tonalitate.",
      ctaEyebrow: "Contactează-ne",
      ctaTitle: "Dorești să discutăm despre",
      ctaTitleHighlight: "proiectul tău?",
      ctaDesc:
        "Suntem aici pentru tine. Pentru orice întrebare sau solicitare, echipa noastră îți va răspunde cu plăcere.",
    },
    // Products page
    products: {
      eyebrow: "Catalog",
      models: "modele",
      titleA: "Gresie și",
      titleB: "faianță",
      desc:
        "Colecții italiene, spaniole și braziliene. Toate produsele sunt în stoc sau disponibile la comandă în 7–14 zile. Prețurile afișate sunt pe metru pătrat.",
      filterAll: "Toate",
      sortLabel: "Sortează",
      sortDefault: "Implicit",
      sortPriceAsc: "Preț ↑",
      sortPriceDesc: "Preț ↓",
      empty: "Nu există produse în această colecție momentan.",
      ctaEyebrow: "Nu găsești ce cauți?",
      ctaTitleA: "Comenzi",
      ctaTitleB: "speciale",
      ctaDesc:
        "Lucrăm cu peste 40 de fabrici. Trimite-ne o referință vizuală sau descrierea texturii dorite — găsim soluția potrivită.",
      ctaButton: "Discută cu un consultant",
      // Detail
      detail: {
        relatedEyebrow: "Din aceeași colecție",
        relatedTitleA: "Mai vezi",
        relatedTitleB: "și",
      },
    },
    // Promotions
    promotions: {
      eyebrow: "Oferte curente",
      titleA: "Promoții",
      titleB: "active",
      desc:
        "Reduceri sezoniere, oferte pentru proiecte mari și beneficii dedicate partenerilor noștri arhitecți și designeri.",
      empty: "Nu sunt promoții active momentan. Revino în curând!",
      newsletterTitle: "Vrei să fii primul care",
      newsletterHighlight: "află?",
      newsletterDesc: "Abonează-te la newsletter și primești ofertele înainte să apară pe site.",
      newsletterCta: "Abonează-te",
    },
    // Architects
    architects: {
      eyebrow: "Programul Prodclas Studio",
      titleA: "Pentru",
      titleB: "arhitecți",
      titleC: "și designeri",
      desc:
        "Construim relații lungi cu studiouri de arhitectură și designeri de interior. Mostre rapide, consultanță tehnică, prețuri preferențiale și acces la lansări înainte de catalog public.",
      benefits: [
        { title: "Răspuns în 24h", body: "Un consultant dedicat răspunde la cereri în maxim o zi lucrătoare." },
        { title: "Prețuri preferențiale", body: "Tarife dedicate pe toate colecțiile, valabile imediat după înregistrare." },
        { title: "Mostre gratuite", body: "Trimitem mostre fizice la birou sau la șantier, fără cost suplimentar." },
        { title: "Acces lansări", body: "Cataloage tehnice și mostre din colecții noi cu 30 de zile înainte de lansare." },
      ],
      howEyebrow: "Cum lucrăm",
      howTitleA: "De la",
      howTitleB: "concept",
      howTitleC: "la șantier.",
      howP1:
        "Trimite-ne briefingul proiectului — referințe vizuale, dimensiuni, buget orientativ. În maxim 48 de ore primești o selecție personalizată, mostre fizice și o ofertă completă cu cantități și termen de livrare.",
      howP2:
        "La nevoie, mergem împreună la șantier. Lucrul în echipă cu meșteri de încredere face diferența între un proiect bun și unul memorabil.",
      formEyebrow: "Înregistrare",
      formTitle: "Aplică pentru programul",
      formTitleHighlight: "Studio",
      formDesc:
        "Câteva detalii despre studio și începem colaborarea. Fără birocrație, fără minim de comandă — vrem să fim parteneri pe termen lung.",
      formPerks: [
        "Cont dedicat cu istoric și mostre cerute",
        "Linie directă cu consultantul tău",
        "Facturare lunară pentru proiecte recurente",
        "Vizite în showroom în afara orelor de program",
      ],
      form: {
        studio: "Nume studio / arhitect",
        email: "Email profesional",
        phone: "Telefon",
        project: "Proiectul curent (opțional)",
        projectPlaceholder: "Tip de spațiu, suprafață, termen estimat...",
        submit: "Trimite aplicația",
      },
    },
    // Contact
    contact: {
      eyebrow: "Contactează-ne",
      titleA: "Hai să",
      titleB: "discutăm.",
      desc:
        "Ai nevoie de ajutor în alegerea produselor potrivite? Vino în showroom sau scrie-ne — primești suport personalizat de la cineva care chiar înțelege materialele.",
      phone: "Telefon",
      email: "Email",
      address: "Adresa",
      addressValue: "Str. Alba Iulia 22",
      city: "Chișinău, Republica Moldova",
      schedule: "Program",
      hoursWeekday: "Luni–Vineri · 09:00 – 18:00",
      hoursSaturday: "Sâmbătă · 10:00 – 15:00",
      formEyebrow: "Formular",
      formTitleA: "Scrie-ne câteva",
      formTitleB: "rânduri.",
      formDesc: "Răspundem în maxim 24 de ore lucrătoare. Pentru cereri urgente, sună direct.",
      form: {
        firstName: "Prenume",
        lastName: "Nume",
        phone: "Telefon",
        email: "Email",
        subject: "Subiect",
        subjectPlaceholder: "Despre ce este vorba...",
        message: "Mesaj",
      },
    },
    // Footer
    footer: {
      tagline:
        "O selecție atent curată de gresie și faianță, pentru spații care merită memoria. Profesionalism, autenticitate, atenție la detaliu.",
      navHeader: "Navigare",
      contactHeader: "Contact",
      newsletterHeader: "Rămâi în legătură",
      newsletterDesc: "Noutăți despre colecții, promoții și evenimente.",
      newsletterPlaceholder: "Adresa ta de email",
      rights: "Toate drepturile rezervate.",
      terms: "Termeni",
      privacy: "Confidențialitate",
      cookies: "Cookies",
    },
  },

  en: {
    nav: {
      home: "Home",
      products: "Products",
      promotions: "Promotions",
      architects: "Architects",
      contact: "Contact",
      menu: "Menu",
    },
    common: {
      explore: "Explore the collections",
      visitShowroom: "Visit the showroom",
      contactUs: "Contact us",
      viewAll: "View all products",
      requestQuote: "Request quote",
      requestSample: "Request sample",
      perSqm: "/ m²",
      price: "Price",
      origin: "Origin",
      format: "Format",
      finish: "Finish",
      stock: "Stock",
      inStock: "Available",
      onOrder: "On order",
      breadcrumbHome: "Home",
      breadcrumbProducts: "Products",
      scrollDown: "Scroll",
      submitting: "Sending...",
      sendMessage: "Send message",
      send: "Send",
    },
    home: {
      eyebrow: "Maison de Ceramică · Chișinău",
      heroLine1a: "Spaces",
      heroLine1b: "that",
      heroLine2a: "tell",
      heroLine2b: "stories.",
      heroDesc:
        "A carefully curated selection of porcelain and ceramic tiles imported from Italy, Spain and Brazil. For homes, hotels and commercial spaces that deserve to last.",
      stats: [
        { num: "12+", label: "Years of experience" },
        { num: "240", label: "Models in stock" },
        { num: "3", label: "Countries of origin" },
      ],
      manifestoEyebrow: "Prodclas Vision",
      manifestoText:
        "To become the most respected supplier of porcelain and ceramic tiles in the region, supported by a motivated, well-trained team focused on the satisfaction of every client.",
      manifestoHighlight: "porcelain and ceramic tiles",
      featuredEyebrow: "New collection",
      featuredTitleA: "This",
      featuredTitleB: "season",
      featuredDesc:
        "Four signature pieces from our latest shipments — rare textures, generous formats, finishes executed with attention to detail.",
      philosophyEyebrow: "Our philosophy",
      philosophyTitleA: "Quality &",
      philosophyTitleB: "aesthetics.",
      philosophyP1:
        "Transform your space with high-quality porcelain and ceramic tiles, perfect for any style — from rustic to modern. Every piece in our collection is chosen for durability and visual impact, offering ideal solutions for floors, walls and countertops.",
      philosophyP2:
        "Complete your project with style and authenticity, bringing elegance and refinement into your home.",
      philosophyCta: "View collection",
      marquee: [
        "Italian marble",
        "Large format 120×280",
        "Authorized importers",
        "Delivery across Moldova",
        "Architectural consulting",
      ],
      beliefsEyebrow: "Why Prodclas",
      beliefsTitleA: "Three",
      beliefsTitleB: "beliefs.",
      beliefs: [
        {
          title: "Direct sourcing",
          body:
            "We work directly with Italian and Spanish factories. No middlemen, no hidden mark-ups — just authentic goods at the right price.",
        },
        {
          title: "Physical showroom",
          body:
            "Tiles need to be felt. Come to our showroom in Chișinău, take samples home, talk to someone who really understands the material.",
        },
        {
          title: "After-sales support",
          body:
            "We recommend trusted craftsmen, deliver to the construction site, and keep stock available for additions 6–12 months after purchase.",
        },
      ],
      exploreEyebrow: "Porcelain & ceramic tiles",
      exploreTitleA: "Explore",
      exploreTitleB: "our products",
      exploreDesc:
        "Over twenty models in permanent stock, with hundreds of variations available to order. Filter by collection, format or tone.",
      ctaEyebrow: "Contact us",
      ctaTitle: "Want to talk about",
      ctaTitleHighlight: "your project?",
      ctaDesc:
        "We're here for you. For any question or request, our team will gladly respond.",
    },
    products: {
      eyebrow: "Catalog",
      models: "models",
      titleA: "Porcelain &",
      titleB: "ceramic tiles",
      desc:
        "Italian, Spanish and Brazilian collections. All products are in stock or available to order within 7–14 days. Prices shown are per square meter.",
      filterAll: "All",
      sortLabel: "Sort",
      sortDefault: "Default",
      sortPriceAsc: "Price ↑",
      sortPriceDesc: "Price ↓",
      empty: "No products in this collection at the moment.",
      ctaEyebrow: "Can't find what you need?",
      ctaTitleA: "Custom",
      ctaTitleB: "orders",
      ctaDesc:
        "We work with over 40 factories. Send us a visual reference or describe the texture you want — we'll find the right solution.",
      ctaButton: "Talk to a consultant",
      detail: {
        relatedEyebrow: "From the same collection",
        relatedTitleA: "See",
        relatedTitleB: "more",
      },
    },
    promotions: {
      eyebrow: "Current offers",
      titleA: "Active",
      titleB: "promotions",
      desc:
        "Seasonal discounts, offers for large projects and dedicated benefits for our architect and designer partners.",
      empty: "No active promotions right now. Check back soon!",
      newsletterTitle: "Want to be the first to",
      newsletterHighlight: "know?",
      newsletterDesc: "Subscribe to the newsletter and get offers before they appear on the site.",
      newsletterCta: "Subscribe",
    },
    architects: {
      eyebrow: "Prodclas Studio Program",
      titleA: "For",
      titleB: "architects",
      titleC: "and designers",
      desc:
        "We build long-term relationships with architecture studios and interior designers. Fast samples, technical consulting, preferential prices, and access to launches before the public catalog.",
      benefits: [
        { title: "24h response", body: "A dedicated consultant answers requests within one business day." },
        { title: "Preferential prices", body: "Dedicated rates on all collections, valid immediately after registration." },
        { title: "Free samples", body: "We send physical samples to your office or construction site at no extra cost." },
        { title: "Launch access", body: "Technical catalogs and samples from new collections 30 days before launch." },
      ],
      howEyebrow: "How we work",
      howTitleA: "From",
      howTitleB: "concept",
      howTitleC: "to construction.",
      howP1:
        "Send us the project brief — visual references, dimensions, approximate budget. Within 48 hours you receive a personalized selection, physical samples, and a complete offer with quantities and delivery time.",
      howP2:
        "When needed, we go to the site together. Working as a team with trusted craftsmen makes the difference between a good project and a memorable one.",
      formEyebrow: "Registration",
      formTitle: "Apply for the",
      formTitleHighlight: "Studio program",
      formDesc:
        "A few details about your studio and we begin the collaboration. No bureaucracy, no minimum orders — we want long-term partners.",
      formPerks: [
        "Dedicated account with history and sample requests",
        "Direct line to your consultant",
        "Monthly billing for recurring projects",
        "Showroom visits outside business hours",
      ],
      form: {
        studio: "Studio / architect name",
        email: "Professional email",
        phone: "Phone",
        project: "Current project (optional)",
        projectPlaceholder: "Type of space, surface area, estimated deadline...",
        submit: "Submit application",
      },
    },
    contact: {
      eyebrow: "Contact us",
      titleA: "Let's",
      titleB: "talk.",
      desc:
        "Need help choosing the right products? Come to the showroom or write to us — get personalized support from someone who really understands materials.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressValue: "Str. Alba Iulia 22",
      city: "Chișinău, Republic of Moldova",
      schedule: "Hours",
      hoursWeekday: "Mon–Fri · 09:00 – 18:00",
      hoursSaturday: "Sat · 10:00 – 15:00",
      formEyebrow: "Form",
      formTitleA: "Write us a few",
      formTitleB: "lines.",
      formDesc: "We respond within 24 business hours. For urgent requests, call directly.",
      form: {
        firstName: "First name",
        lastName: "Last name",
        phone: "Phone",
        email: "Email",
        subject: "Subject",
        subjectPlaceholder: "What is this about...",
        message: "Message",
      },
    },
    footer: {
      tagline:
        "A carefully curated selection of porcelain and ceramic tiles, for spaces that deserve to be remembered. Professionalism, authenticity, attention to detail.",
      navHeader: "Navigate",
      contactHeader: "Contact",
      newsletterHeader: "Stay in touch",
      newsletterDesc: "News about collections, promotions and events.",
      newsletterPlaceholder: "Your email address",
      rights: "All rights reserved.",
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies",
    },
  },

  ru: {
    nav: {
      home: "Главная",
      products: "Продукция",
      promotions: "Акции",
      architects: "Архитекторам",
      contact: "Контакты",
      menu: "Меню",
    },
    common: {
      explore: "Смотреть коллекции",
      visitShowroom: "Посетить шоурум",
      contactUs: "Связаться с нами",
      viewAll: "Все товары",
      requestQuote: "Запросить смету",
      requestSample: "Заказать образец",
      perSqm: "/ м²",
      price: "Цена",
      origin: "Происхождение",
      format: "Формат",
      finish: "Поверхность",
      stock: "Наличие",
      inStock: "В наличии",
      onOrder: "Под заказ",
      breadcrumbHome: "Главная",
      breadcrumbProducts: "Продукция",
      scrollDown: "Прокрутите",
      submitting: "Отправка...",
      sendMessage: "Отправить сообщение",
      send: "Отправить",
    },
    home: {
      eyebrow: "Maison de Ceramică · Кишинёв",
      heroLine1a: "Пространства,",
      heroLine1b: "которые",
      heroLine2a: "рассказывают",
      heroLine2b: "истории.",
      heroDesc:
        "Тщательно подобранная коллекция керамогранита и керамической плитки из Италии, Испании и Бразилии. Для домов, отелей и коммерческих помещений, которые должны радовать долгие годы.",
      stats: [
        { num: "12+", label: "Лет опыта" },
        { num: "240", label: "Моделей в наличии" },
        { num: "3", label: "Страны происхождения" },
      ],
      manifestoEyebrow: "Видение Prodclas",
      manifestoText:
        "Стать самым уважаемым поставщиком керамогранита и плитки в регионе, опираясь на мотивированную, профессиональную команду, ориентированную на удовлетворённость каждого клиента.",
      manifestoHighlight: "керамогранита и плитки",
      featuredEyebrow: "Новая коллекция",
      featuredTitleA: "Выбор",
      featuredTitleB: "сезона",
      featuredDesc:
        "Четыре знаковые модели из последних поставок — редкие текстуры, крупные форматы, безупречно выполненные поверхности.",
      philosophyEyebrow: "Наша философия",
      philosophyTitleA: "Качество и",
      philosophyTitleB: "эстетика.",
      philosophyP1:
        "Преобразите своё пространство с помощью высококачественного керамогранита и плитки, подходящих для любого стиля — от рустика до модерна. Каждая плитка в нашей коллекции выбрана за прочность и визуальный эффект, идеально подходит для пола, стен и столешниц.",
      philosophyP2:
        "Дополните свой проект стилем и аутентичностью, привнося элегантность и утончённость в ваш дом.",
      philosophyCta: "Смотреть коллекцию",
      marquee: [
        "Итальянский мрамор",
        "Крупный формат 120×280",
        "Авторизованные импортёры",
        "Доставка по всей Молдове",
        "Архитектурные консультации",
      ],
      beliefsEyebrow: "Почему Prodclas",
      beliefsTitleA: "Три",
      beliefsTitleB: "убеждения.",
      beliefs: [
        {
          title: "Прямые поставки",
          body:
            "Мы работаем напрямую с итальянскими и испанскими фабриками. Без посредников, без скрытых наценок — только подлинный товар по справедливой цене.",
        },
        {
          title: "Физический шоурум",
          body:
            "Плитку нужно чувствовать на ощупь. Приезжайте в наш шоурум в Кишинёве, возьмите образцы домой, поговорите с тем, кто действительно понимает материал.",
        },
        {
          title: "Послепродажная поддержка",
          body:
            "Рекомендуем проверенных мастеров, доставляем на объект и держим товар в наличии для дозаказа в течение 6–12 месяцев после покупки.",
        },
      ],
      exploreEyebrow: "Керамогранит и плитка",
      exploreTitleA: "Посмотрите",
      exploreTitleB: "нашу продукцию",
      exploreDesc:
        "Более двадцати моделей в постоянном наличии, сотни вариаций под заказ. Фильтруйте по коллекции, формату или тону.",
      ctaEyebrow: "Свяжитесь с нами",
      ctaTitle: "Хотите обсудить",
      ctaTitleHighlight: "ваш проект?",
      ctaDesc:
        "Мы здесь для вас. На любой вопрос или запрос наша команда с радостью ответит.",
    },
    products: {
      eyebrow: "Каталог",
      models: "моделей",
      titleA: "Керамогранит и",
      titleB: "плитка",
      desc:
        "Итальянские, испанские и бразильские коллекции. Все товары в наличии или доступны под заказ в течение 7–14 дней. Цены указаны за квадратный метр.",
      filterAll: "Все",
      sortLabel: "Сортировка",
      sortDefault: "По умолчанию",
      sortPriceAsc: "Цена ↑",
      sortPriceDesc: "Цена ↓",
      empty: "В этой коллекции пока нет товаров.",
      ctaEyebrow: "Не нашли подходящее?",
      ctaTitleA: "Заказ",
      ctaTitleB: "под проект",
      ctaDesc:
        "Мы работаем с более чем 40 фабриками. Пришлите визуальную референцию или опишите нужную текстуру — найдём решение.",
      ctaButton: "Связаться с консультантом",
      detail: {
        relatedEyebrow: "Из этой же коллекции",
        relatedTitleA: "Смотрите",
        relatedTitleB: "также",
      },
    },
    promotions: {
      eyebrow: "Текущие предложения",
      titleA: "Активные",
      titleB: "акции",
      desc:
        "Сезонные скидки, специальные предложения для крупных проектов и эксклюзивные условия для наших партнёров — архитекторов и дизайнеров.",
      empty: "Активных акций пока нет. Загляните позже!",
      newsletterTitle: "Хотите узнавать",
      newsletterHighlight: "первыми?",
      newsletterDesc: "Подпишитесь на рассылку и получайте предложения раньше, чем они появятся на сайте.",
      newsletterCta: "Подписаться",
    },
    architects: {
      eyebrow: "Программа Prodclas Studio",
      titleA: "Для",
      titleB: "архитекторов",
      titleC: "и дизайнеров",
      desc:
        "Мы строим долгосрочные отношения с архитектурными студиями и дизайнерами интерьеров. Быстрые образцы, технические консультации, специальные цены и доступ к новинкам до публичного каталога.",
      benefits: [
        { title: "Ответ за 24 часа", body: "Персональный консультант отвечает на запросы в течение одного рабочего дня." },
        { title: "Специальные цены", body: "Эксклюзивные тарифы на все коллекции, действуют сразу после регистрации." },
        { title: "Бесплатные образцы", body: "Доставляем физические образцы в офис или на объект без доплат." },
        { title: "Доступ к новинкам", body: "Технические каталоги и образцы новых коллекций за 30 дней до официального запуска." },
      ],
      howEyebrow: "Как мы работаем",
      howTitleA: "От",
      howTitleB: "идеи",
      howTitleC: "до объекта.",
      howP1:
        "Пришлите бриф проекта — визуальные референции, размеры, ориентировочный бюджет. В течение 48 часов получите персональный подбор, физические образцы и полную смету с количествами и сроками поставки.",
      howP2:
        "При необходимости выезжаем на объект вместе. Слаженная работа с проверенными мастерами — разница между хорошим проектом и запоминающимся.",
      formEyebrow: "Регистрация",
      formTitle: "Подать заявку в программу",
      formTitleHighlight: "Studio",
      formDesc:
        "Несколько деталей о вашей студии — и начинаем работать. Без бюрократии, без минимального заказа — мы за долгосрочное партнёрство.",
      formPerks: [
        "Личный кабинет с историей запросов и образцов",
        "Прямая линия с вашим консультантом",
        "Ежемесячное выставление счетов для регулярных проектов",
        "Посещение шоурума в нерабочее время",
      ],
      form: {
        studio: "Название студии / архитектор",
        email: "Рабочий email",
        phone: "Телефон",
        project: "Текущий проект (необязательно)",
        projectPlaceholder: "Тип помещения, площадь, ориентировочный срок...",
        submit: "Отправить заявку",
      },
    },
    contact: {
      eyebrow: "Свяжитесь с нами",
      titleA: "Давайте",
      titleB: "поговорим.",
      desc:
        "Нужна помощь в выборе подходящих товаров? Приезжайте в шоурум или напишите нам — получите персональную поддержку от того, кто действительно разбирается в материалах.",
      phone: "Телефон",
      email: "Email",
      address: "Адрес",
      addressValue: "Ул. Алба Юлия 22",
      city: "Кишинёв, Республика Молдова",
      schedule: "Часы работы",
      hoursWeekday: "Пн–Пт · 09:00 – 18:00",
      hoursSaturday: "Сб · 10:00 – 15:00",
      formEyebrow: "Форма",
      formTitleA: "Напишите нам",
      formTitleB: "пару строк.",
      formDesc: "Отвечаем в течение 24 рабочих часов. По срочным вопросам — звоните напрямую.",
      form: {
        firstName: "Имя",
        lastName: "Фамилия",
        phone: "Телефон",
        email: "Email",
        subject: "Тема",
        subjectPlaceholder: "О чём идёт речь...",
        message: "Сообщение",
      },
    },
    footer: {
      tagline:
        "Тщательно подобранная коллекция керамогранита и плитки для пространств, достойных памяти. Профессионализм, аутентичность, внимание к деталям.",
      navHeader: "Навигация",
      contactHeader: "Контакты",
      newsletterHeader: "Оставайтесь на связи",
      newsletterDesc: "Новости о коллекциях, акциях и событиях.",
      newsletterPlaceholder: "Ваш email",
      rights: "Все права защищены.",
      terms: "Условия",
      privacy: "Конфиденциальность",
      cookies: "Cookies",
    },
  },
} as const;

export function getDict(locale: Locale) {
  return dict[locale] ?? dict[DEFAULT_LOCALE];
}
