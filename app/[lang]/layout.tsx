import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "../globals.css";
import { LANGS, isLang, PROFILE } from "@/lib/content";

const META = {
  ky: { title: "Мирлан Акунали уулу — fullstack developer", desc: "Python, Django, FastAPI, NestJS жана Next.js менен AI, карта жана real-time продуктулар. Портфолио: Too Arna, FlowForge, DocuMind, e-zapis." },
  ru: { title: "Мирлан Акунали уулу — fullstack-разработчик", desc: "Продукты с AI, картами и real-time на Python, Django, FastAPI, NestJS и Next.js. Портфолио: Too Arna, FlowForge, DocuMind, e-zapis." },
  en: { title: "Mirlan Akunali uulu — fullstack developer", desc: "AI, map and real-time products with Python, Django, FastAPI, NestJS and Next.js. Portfolio: Too Arna, FlowForge, DocuMind, e-zapis." },
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const m = META[lang];
  const site = process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  return {
    metadataBase: new URL(site),
    title: m.title,
    description: m.desc,
    authors: [{ name: PROFILE.name[lang], url: PROFILE.github }],
    alternates: { languages: { ky: "/ky", ru: "/ru", en: "/en" } },
    openGraph: { title: m.title, description: m.desc, type: "website", images: ["/images/tooarna-home.jpg"] },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
