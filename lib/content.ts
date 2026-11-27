// Бардык тексттер ушул жерде. Резюме келгенде PROFILE'ди толтуруңуз.

export const LANGS = ["ky", "ru", "en"] as const;
export type Lang = (typeof LANGS)[number];
export type L = Record<Lang, string>;

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}

export const PROFILE = {
  name: { ky: "Мирлан Акунали уулу", ru: "Мирлан Акунали уулу", en: "Mirlan Akunali uulu" } as L,
  github: "https://github.com/usermirlan",
  githubUser: "usermirlan",
  instagram: "https://www.instagram.com/mir1an.00/",
  instagramUser: "@mir1an.00",
  // TODO: резюмеден толтуруу. Бош калса, баскыч көрсөтүлбөйт.
  email: "mirlanakunaliev@gmail.com",
  telegram: "", // мисалы: "https://t.me/username"
  telegramUser: "",
  linkedin: "",
  resume: "/resume.pdf",
  education: {
    ky: "Ош мамлекеттик университети · Программалык инженерия (бакалавр): веб жана мобилдик иштеп чыгуу",
    ru: "Ошский государственный университет · Программная инженерия (бакалавриат): веб- и мобильная разработка",
    en: "Osh State University · Software Engineering (BSc): web and mobile development",
  } as L,
  educationYears: "2022 — 2027",
  photo: "/images/mirlan.jpg",
};

export const UI = {
  nav: {
    work: { ky: "Долбоорлор", ru: "Проекты", en: "Work" },
    stack: { ky: "Стек", ru: "Стек", en: "Stack" },
    about: { ky: "Мен жөнүндө", ru: "Обо мне", en: "About" },
    contact: { ky: "Байланыш", ru: "Контакты", en: "Contact" },
    resume: { ky: "Резюме", ru: "Резюме", en: "Résumé" },
  },
  status: {
    ky: "Жумушка ачыкмын · Ош, Кыргызстан",
    ru: "Открыт к работе · Ош, Кыргызстан",
    en: "Open to work · Osh, Kyrgyzstan",
  },
  heroA: { ky: "Идеядан", ru: "От идеи", en: "From idea" },
  heroB: { ky: "деплойго", ru: "до деплоя", en: "to deploy" },
  heroC: { ky: " чейин", ru: "", en: "" },
  heroLead: {
    ky: "— fullstack developer. Python (Django, FastAPI), Node.js (NestJS) жана React/Next.js менен AI, карта жана real-time продуктуларды башынан аягына чейин жасайм.",
    ru: "— fullstack-разработчик. Делаю продукты с AI, картами и real-time от начала до конца на Python (Django, FastAPI), Node.js (NestJS) и React/Next.js.",
    en: "— fullstack developer. I build AI, map and real-time products end to end with Python (Django, FastAPI), Node.js (NestJS) and React/Next.js.",
  },
  seeWork: { ky: "Долбоорлорду көрүү", ru: "Смотреть проекты", en: "See my work" },
  facts: [
    { v: "10", t: { ky: "долбоор, баары нөлдөн баштап", ru: "проектов, все с нуля", en: "projects, all built from scratch" } },
    { v: "5", t: { ky: "жандуу демо интернетте", ru: "живых демо в интернете", en: "live demos online" } },
    { v: "109", t: { ky: "автотест үч долбоордо", ru: "автотестов в трёх проектах", en: "automated tests across three projects" } },
    { v: "KY·RU·EN", t: { ky: "интерфейстер 2–3 тилде", ru: "интерфейсы на 2–3 языках", en: "interfaces in 2–3 languages" } },
  ],
  workTitle: { ky: "Тандалган иштер", ru: "Избранные работы", en: "Selected work" },
  hard: { ky: "КЫЙЫН БӨЛҮГҮ", ru: "САМОЕ СЛОЖНОЕ", en: "THE HARD PART" },
  live: { ky: "Жандуу демо", ru: "Живое демо", en: "Live demo" },
  code: { ky: "Коду", ru: "Код", en: "Code" },
  moreTitle: { ky: "Дагы долбоорлор", ru: "Ещё проекты", en: "More projects" },
  allGithub: { ky: "GitHub'дагы баары", ru: "Всё на GitHub", en: "Everything on GitHub" },
  stackTitle: { ky: "Стек", ru: "Стек", en: "Stack" },
  aboutTitle: { ky: "Мен жөнүндө", ru: "Обо мне", en: "About me" },
  aboutText: {
    ky: "Мен продуктуну толугу менен ойлоп, жасап, интернетке чыгарам: маалымат базасынын схемасынан тартып интерфейстеги акыркы анимацияга чейин. Кыргыз тилинде сапаттуу санарип продуктулар көбөйсө деп каалайм.",
    ru: "Я продумываю, делаю и выкатываю продукт целиком: от схемы базы данных до последней анимации в интерфейсе. Хочу, чтобы качественных цифровых продуктов на кыргызском языке становилось больше.",
    en: "I design, build and ship whole products: from the database schema to the last animation in the UI. I want to see more high-quality digital products in the Kyrgyz language.",
  },
  aboutRows: {
    edu: { ky: "Билим", ru: "Образование", en: "Education" },
    portfolio: { ky: "Портфолио", ru: "Портфолио", en: "Portfolio" },
    portfolioText: {
      ky: "Too Arna, FlowForge, DocuMind, e-zapis жана башкалар",
      ru: "Too Arna, FlowForge, DocuMind, e-zapis и другие",
      en: "Too Arna, FlowForge, DocuMind, e-zapis and more",
    },
    langs: { ky: "Тилдер", ru: "Языки", en: "Languages" },
    langsText: {
      ky: "Кыргызча (эне тил) · Орусча · Англисче (орто деңгээл) · Немисче A2",
      ru: "Кыргызский (родной) · Русский · Английский (средний) · Немецкий A2",
      en: "Kyrgyz (native) · Russian · English (intermediate) · German A2",
    },
  },
  contactKicker: { ky: "// байланыш", ru: "// контакты", en: "// contact" },
  contactTitleA: { ky: "Бирге бир нерсе", ru: "Давайте построим", en: "Let's build" },
  contactTitleB: { ky: "курайлы.", ru: "что-нибудь вместе.", en: "something together." },
  footerMade: { ky: "Next.js менен жасалды · Vercel", ru: "Сделано на Next.js · Vercel", en: "Built with Next.js · Vercel" },
} satisfies Record<string, unknown>;

export type Project = {
  id: string;
  n: string;
  name: string;
  accent: string;
  kind: L;
  tagline: L;
  hard: L;
  stack: string[];
  live?: string;
  repo: string;
  domain: string;
  images: { src: string; alt: L }[];
};

export const PROJECTS: Project[] = [
  {
    id: "too-arna",
    n: "01",
    name: "Too Arna",
    accent: "#4ade80",
    kind: { ky: "Fullstack · Гео · AI", ru: "Fullstack · Гео · AI", en: "Fullstack · Geo · AI" },
    tagline: {
      ky: "Кыргызстандын тоо маршруттары: интерактивдүү карта, GPX трек, бийиктик профили, аба ырайы жана офлайн режим.",
      ru: "Горные маршруты Кыргызстана: интерактивная карта, GPX-треки, профиль высот, погода и офлайн-режим.",
      en: "Mountain trails of Kyrgyzstan: interactive map, GPX tracks, elevation profiles, weather and offline mode.",
    },
    hard: {
      ky: "Маршрут конструктору: ар бир бөлүк OSM тропалары боюнча BRouter аркылуу түшөт. AI пландоочу tool calling менен базадагы чыныгы маршруттарды гана сунуштайт.",
      ru: "Конструктор маршрутов: каждый отрезок прокладывается по тропам OSM через BRouter. AI-планировщик через tool calling предлагает только реальные маршруты из базы.",
      en: "Route builder: every segment snaps to OSM trails via BRouter. The AI planner uses tool calling and only suggests real trails from the database.",
    },
    stack: ["Django 5", "GeoDjango", "PostGIS", "Next.js 16", "MapLibre", "PWA"],
    live: "https://kyrgyz-trails-rho.vercel.app",
    repo: "https://github.com/usermirlan/kyrgyz-trails",
    domain: "kyrgyz-trails-rho.vercel.app",
    images: [
      { src: "/images/tooarna-home.jpg", alt: { ky: "Too Arna: башкы бет", ru: "Too Arna: главная", en: "Too Arna: home page" } },
      { src: "/images/tooarna-builder.jpg", alt: { ky: "Too Arna: маршрут конструктору", ru: "Too Arna: конструктор маршрутов", en: "Too Arna: route builder" } },
      { src: "/images/tooarna-planner.jpg", alt: { ky: "Too Arna: AI пландоочу", ru: "Too Arna: AI-планировщик", en: "Too Arna: AI planner" } },
    ],
  },
  {
    id: "flowforge",
    n: "02",
    name: "FlowForge",
    accent: "#a78bfa",
    kind: { ky: "Автоматташтыруу · Real-time", ru: "Автоматизация · Real-time", en: "Automation · Real-time" },
    tagline: {
      ky: "n8n/Zapier'дин мини-версиясы: блокторду канваста туташтырып, коддосуз автоматтык процесстерди түзөсүз.",
      ru: "Мини-версия n8n/Zapier: соединяете блоки на холсте и собираете автоматизации без кода.",
      en: "A mini n8n/Zapier: connect blocks on a canvas and build automations without code.",
    },
    hard: {
      ky: "Workflow движогу Celery'де иштейт, ар бир блоктун абалы WebSocket (Redis pub/sub) аркылуу тирүү жанат. Ачкычтар Fernet менен шифрленет, HTTP блогу SSRF'тен корголгон.",
      ru: "Движок workflow работает на Celery, статус каждого блока обновляется вживую через WebSocket (Redis pub/sub). Ключи шифруются Fernet, HTTP-блок защищён от SSRF.",
      en: "The workflow engine runs on Celery; each block's status lights up live over WebSocket (Redis pub/sub). Secrets are Fernet-encrypted and the HTTP block is SSRF-protected.",
    },
    stack: ["FastAPI", "Celery", "Redis", "PostgreSQL", "React Flow", "WebSocket"],
    live: "https://flowforge-pied.vercel.app",
    repo: "https://github.com/usermirlan/flowforge",
    domain: "flowforge-pied.vercel.app",
    images: [
      { src: "/images/flowforge-run.jpg", alt: { ky: "FlowForge: иштеп жаткан редактор", ru: "FlowForge: запуск в редакторе", en: "FlowForge: editor during a run" } },
      { src: "/images/flowforge-workflows.jpg", alt: { ky: "FlowForge: workflow тизмеси", ru: "FlowForge: список workflow", en: "FlowForge: workflow list" } },
      { src: "/images/flowforge-editor.jpg", alt: { ky: "FlowForge: редактор", ru: "FlowForge: редактор", en: "FlowForge: editor" } },
    ],
  },
  {
    id: "documind",
    n: "03",
    name: "DocuMind",
    accent: "#ff7a4d",
    kind: { ky: "AI · RAG · Презентациялар", ru: "AI · RAG · Презентации", en: "AI · RAG · Presentations" },
    tagline: {
      ky: "Документтериңиз менен сүйлөшүңүз: булагы көрсөтүлгөн жооптор, кыскача мазмун жана Gamma сыяктуу AI презентациялар.",
      ru: "Общайтесь со своими документами: ответы с источниками, краткие содержания и AI-презентации в стиле Gamma.",
      en: "Chat with your documents: answers with sources, summaries and Gamma-style AI presentations.",
    },
    hard: {
      ky: "Гибрид издөө: pgvector + толук текст, RRF менен бириктирилет. Слайддар агым менен (streaming) бирден пайда болуп, PPTX'ке жана PDF'ке экспорттолот.",
      ru: "Гибридный поиск: pgvector + полнотекстовый, объединённые через RRF. Слайды появляются по одному в потоке и экспортируются в PPTX и PDF.",
      en: "Hybrid search: pgvector plus full-text, fused with RRF. Slides stream in one by one and export to PPTX and PDF.",
    },
    stack: ["FastAPI", "pgvector", "RAG", "SSE", "python-pptx", "Next.js 16"],
    live: "https://documind-jade-three.vercel.app",
    repo: "https://github.com/usermirlan/documind",
    domain: "documind-jade-three.vercel.app",
    images: [
      { src: "/images/documind-deck.jpg", alt: { ky: "DocuMind: слайд редактору", ru: "DocuMind: редактор слайдов", en: "DocuMind: slide editor" } },
      { src: "/images/documind-chat.jpg", alt: { ky: "DocuMind: документ менен маек", ru: "DocuMind: чат с документом", en: "DocuMind: document chat" } },
      { src: "/images/documind-pres.jpg", alt: { ky: "DocuMind: презентация", ru: "DocuMind: презентация", en: "DocuMind: presentation" } },
    ],
  },
  {
    id: "e-zapis",
    n: "04",
    name: "e-zapis",
    accent: "#60a5fa",
    kind: { ky: "Диплом · Медицина · Real-time", ru: "Диплом · Медицина · Real-time", en: "Thesis · Healthcare · Real-time" },
    tagline: {
      ky: "МедЗапись — поликлиникага онлайн жазылуу: дарыгер тандоо, бош убакыт, электрондук талон жана дарыгер менен администратордун панели.",
      ru: "МедЗапись — онлайн-запись в поликлинику: выбор врача, свободное время, электронный талон и панели врача и администратора.",
      en: "MedZapis — online clinic booking: choose a doctor and a free slot, get an e-ticket; separate doctor and admin dashboards.",
    },
    hard: {
      ky: "Дарыгер иш күндөрүн жана интервалды берет, система слотторду өзү түзөт. Талондун статусу Channels (WebSocket) аркылуу тирүү жаңыланат. 16 модель, 56 тест.",
      ru: "Врач задаёт рабочие дни и интервал, система сама генерирует слоты. Статус талона обновляется вживую через Channels (WebSocket). 16 моделей, 56 тестов.",
      en: "Doctors set working days and intervals and the system generates slots. Ticket status updates live via Channels (WebSocket). 16 models, 56 tests.",
    },
    stack: ["Django", "DRF", "Channels", "allauth", "PWA", "Docker"],
    live: "https://ezapis.pythonanywhere.com",
    repo: "https://github.com/usermirlan/e-zapis",
    domain: "ezapis.pythonanywhere.com",
    images: [
      { src: "/images/ezapis-home.jpg", alt: { ky: "МедЗапись: башкы бет", ru: "МедЗапись: главная", en: "MedZapis: home page" } },
      { src: "/images/ezapis-doctors.jpg", alt: { ky: "МедЗапись: дарыгерлер", ru: "МедЗапись: врачи", en: "MedZapis: doctors" } },
      { src: "/images/ezapis-dash.jpg", alt: { ky: "МедЗапись: дарыгердин панели", ru: "МедЗапись: кабинет врача", en: "MedZapis: doctor dashboard" } },
    ],
  },
];

export type MiniProject = { n: string; color: string; label: L; name: L; desc: L; stack: string; repo?: string; live?: string };

export const MORE: MiniProject[] = [
  {
    n: "05",
    color: "#facc15",
    label: { ky: "KANBAN · АВТОМАТТАШТЫРУУ", ru: "KANBAN · АВТОМАТИЗАЦИЯ", en: "KANBAN · AUTOMATION" },
    name: { ky: "Автоматтык Kanban", ru: "Автоматический Kanban", en: "Self-driving Kanban" },
    desc: {
      ky: "Тапшырмалар өзү жылат: окуяга негизделген «роботтор» статусту алмаштырат, долбоордун подтапшырмаларын түзөт, убакытты эсептейт.",
      ru: "Задачи двигаются сами: событийные «роботы» меняют статусы, создают подзадачи проекта и считают время.",
      en: "Tasks move on their own: event-driven “robots” change statuses, generate project subtasks and track time.",
    },
    stack: "NestJS · React · Socket.io · Prisma · Turborepo",
    repo: "https://github.com/usermirlan/pm_automation_js",
  },
  {
    n: "06",
    color: "#fb923c",
    label: { ky: "БИЗНЕС ҮЧҮН", ru: "ДЛЯ БИЗНЕСА", en: "FOR BUSINESS" },
    name: { ky: "Той чакыруулары", ru: "Онлайн-приглашения на той", en: "Wedding invitations" },
    desc: {
      ky: "Онлайн чакыруу сатуучу сайт: конверт анимациясы, таймер, музыка, 2GIS, «Келесизби?» жана той ээси үчүн коноктор тизмеси.",
      ru: "Сайт для продажи онлайн-приглашений: анимация конверта, таймер, музыка, 2GIS, RSVP и список гостей для хозяев.",
      en: "A site for selling online invitations: envelope animation, countdown, music, 2GIS map, RSVP and a guest list for hosts.",
    },
    stack: "Django · Render",
    repo: "https://github.com/usermirlan/Svadba",
  },
  {
    n: "07",
    color: "#4ade80",
    label: { ky: "E-COMMERCE", ru: "E-COMMERCE", en: "E-COMMERCE" },
    name: { ky: "Гүл дүкөнү", ru: "Цветочный магазин", en: "Flower shop" },
    desc: {
      ky: "Каталог, себет, жеткирүү убактысы. Буйрутма дүкөндүн WhatsApp'ына даяр билдирүү менен кетет, ээсинин өз панели бар.",
      ru: "Каталог, корзина, время доставки. Заказ уходит в WhatsApp магазина готовым сообщением, у владельца своя панель.",
      en: "Catalog, cart, delivery time. Orders go to the shop's WhatsApp as a ready message; the owner has their own panel.",
    },
    stack: "Django · WhatsApp · Render",
    repo: "https://github.com/usermirlan/flowers-shop",
  },
  {
    n: "08",
    color: "#60a5fa",
    label: { ky: "КАССА · КАМПА", ru: "КАССА · СКЛАД", en: "POS · INVENTORY" },
    name: { ky: "Chek-shop", ru: "Chek-shop", en: "Chek-shop" },
    desc: {
      ky: "Дүкөн үчүн сатуу жана товар эсеби: категориялар, сатуулар, чектер жана кампадагы кыймыл.",
      ru: "Учёт продаж и товаров для магазина: категории, продажи, чеки и движение по складу.",
      en: "Sales and stock tracking for a shop: categories, sales, receipts and inventory movements.",
    },
    stack: "Django · SQLite",
    repo: "https://github.com/usermirlan/Chek-shop",
  },
  {
    n: "09",
    color: "#2dd4bf",
    label: { ky: "ФИНТЕХ", ru: "ФИНТЕХ", en: "FINTECH" },
    name: { ky: "Bank System", ru: "Bank System", en: "Bank System" },
    desc: {
      ky: "Банк системасынын веб-тиркемеси. Render булут платформасында иштеп турат, коду жабык.",
      ru: "Веб-приложение банковской системы. Работает на облачной платформе Render, код закрыт.",
      en: "A banking system web app, running on the Render cloud platform. Source code is private.",
    },
    stack: "Python · Django · Render",
    live: "https://bank-system-5olz.onrender.com",
  },
];

export const ARCHIVE = {
  n: "10",
  label: { ky: "АРХИВ", ru: "АРХИВ", en: "ARCHIVE" } as L,
  text: {
    ky: "№22 «Дыйкан» орто мектебинин сайты — алгачкы долбоорум (HTML, CSS, JS)",
    ru: "Сайт средней школы №22 «Дыйкан» — один из первых проектов (HTML, CSS, JS)",
    en: "Website for Dyikan secondary school No. 22 — one of my first projects (HTML, CSS, JS)",
  } as L,
  repo: "https://github.com/usermirlan/dyikan22",
};

export const STACK = [
  { title: "BACKEND", color: "#ff7a4d", items: ["Python · Node.js", "Django · DRF · FastAPI", "NestJS · Socket.io", "Celery · Channels"] },
  { title: "FRONTEND", color: "#a78bfa", items: ["TypeScript · JavaScript", "Next.js 16 · React 19 · Vue.js", "Tailwind 4 · React Flow", "MapLibre · Flutter"] },
  { title: "DATA", color: "#4ade80", items: ["PostgreSQL 16", "PostGIS · pgvector", "MySQL · Redis · SQLite", "SQLAlchemy · Prisma"] },
  { title: "AI · DEVOPS", color: "#60a5fa", items: ["LLM tool calling · RAG", "Docker · GitHub Actions", "Vercel · Render · Neon", "pytest"] },
];

export const MARQUEE = [
  "Python", "Django", "FastAPI", "NestJS", "TypeScript", "Next.js", "React", "PostgreSQL",
  "PostGIS", "pgvector", "Redis", "Celery", "WebSocket", "Docker", "LLM · RAG", "MapLibre",
];
