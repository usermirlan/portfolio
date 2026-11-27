import Image from "next/image";
import { notFound } from "next/navigation";
import { ARCHIVE, LANGS, MARQUEE, MORE, PROFILE, PROJECTS, STACK, UI, isLang, type Lang } from "@/lib/content";
import { Btn, Chip, GithubIcon } from "@/components/ui";
import ThemeToggle from "@/components/ThemeToggle";
import Terrain from "@/components/Terrain";
import Effects from "@/components/Effects";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = (o: Record<Lang, string>) => o[lang];

  const contacts = [
    PROFILE.github && { href: PROFILE.github, label: `GitHub · ${PROFILE.githubUser}` },
    PROFILE.telegram && { href: PROFILE.telegram, label: `Telegram · ${PROFILE.telegramUser}` },
    PROFILE.linkedin && { href: PROFILE.linkedin, label: "LinkedIn" },
    PROFILE.instagram && { href: PROFILE.instagram, label: `Instagram · ${PROFILE.instagramUser}` },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <div className="min-h-screen overflow-x-clip">
      <Effects />
      {/* NAV: floating glass bar */}
      <header id="top" className="sticky top-3 z-40 px-3 md:top-4 md:px-6">
        <nav className="nav-glass mx-auto flex max-w-[1200px] items-center justify-between gap-3 rounded-2xl px-2.5 py-2 md:px-3">
          <a href={`/${lang}`} className="flex items-center gap-2.5 rounded-xl py-1 pr-2 pl-1 font-mono text-[15px] font-bold">
            <span className="logo-badge flex h-9 w-9 items-center justify-center rounded-xl font-sans text-base font-extrabold text-white">М</span>
            <span className="hidden sm:inline">мирлан<span className="text-accent">.dev</span></span>
          </a>
          <div className="hidden items-center gap-0.5 text-[15px] font-medium text-zinc-300 lg:flex">
            {(["work", "stack", "about", "contact"] as const).map((k) => (
              <a key={k} href={`#${k}`} className="nav-link rounded-xl px-4 py-2.5 transition-colors hover:text-zinc-100">
                {t(UI.nav[k])}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle labels={{ light: t(UI.themeLight), dark: t(UI.themeDark) }} />
            <div role="group" aria-label="Language" className="flex gap-0.5 rounded-full border border-line2 p-[3px] font-mono">
              {LANGS.map((l) => (
                <a
                  key={l}
                  href={`/${l}`}
                  hrefLang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={`rounded-full px-2.5 py-1.5 text-xs uppercase transition-colors ${l === lang ? "bg-zinc-100 font-bold text-ink" : "text-zinc-400 hover:text-zinc-100"}`}
                >
                  {l}
                </a>
              ))}
            </div>
            <a href="#contact" className="cta-glow hidden items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-ink transition hover:brightness-110 sm:inline-flex">
              {t(UI.hire)}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="relative -mt-[76px] overflow-hidden border-b border-line pt-[76px]">
          <div aria-hidden="true" className="aurora pointer-events-none absolute inset-0">
            <span className="a1" /><span className="a2" /><span className="a3" />
          </div>
          <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />
          <Terrain />
          <div aria-hidden="true" className="hero-fade pointer-events-none absolute inset-x-0 bottom-0 h-40" />
          <div className="relative mx-auto flex max-w-[1280px] flex-col gap-8 px-5 pt-16 md:gap-9 md:px-8 md:pt-24">
            <span className="rise flex items-center gap-2.5 self-start rounded-full border border-line2 bg-panel px-3.5 py-2 font-mono text-[13px] text-zinc-300">
              <span className="pulse h-2 w-2 rounded-full bg-green-400" />
              {t(UI.status)}
            </span>
            <h1 className="max-w-[1100px] text-[56px] leading-[0.95] font-extrabold tracking-[-0.05em] sm:text-[88px] lg:text-[132px]">
              <span className="line"><span style={{ animationDelay: "60ms" }}>{t(UI.heroA)}</span></span>
              <span className="line">
                <span className="text-grad" style={{ animationDelay: "180ms" }}>{t(UI.heroB)}</span>
                {t(UI.heroC).trim() && " "}
                <span style={{ animationDelay: "300ms" }}>{t(UI.heroC).trim()}<span className="text-accent">.</span></span>
              </span>
            </h1>
            <div className="rise flex flex-wrap items-end justify-between gap-8" style={{ animationDelay: "420ms" }}>
              <p className="max-w-[560px] text-lg leading-relaxed text-zinc-400 md:text-[22px] md:leading-normal">
                <strong className="font-semibold text-zinc-100">{t(PROFILE.name)}</strong> {t(UI.heroLead)}
              </p>
              <div className="flex flex-wrap gap-3">
                <Btn href="#work" variant="accent">{t(UI.seeWork)} ↓</Btn>
                <Btn href={PROFILE.github} external>
                  <GithubIcon /> GitHub
                </Btn>
              </div>
            </div>

            {/* fanned screenshots */}
            <div aria-hidden="true" className="fan rise relative mt-6 h-[200px] sm:h-[300px] lg:h-[380px]" style={{ animationDelay: "560ms" }}>
              <Image src="/images/ezapis-dark.jpg" alt="" width={1440} height={900} priority sizes="46vw"
                className="absolute top-[60px] left-[2%] w-[46%] -rotate-4 rounded-t-2xl border border-zinc-700 shadow-soft shadow-[0_30px_80px_rgba(0,0,0,0.6)]" />
              <Image src="/images/toi-hero.jpg" alt="" width={1440} height={900} priority sizes="46vw"
                className="absolute top-[60px] right-[2%] w-[46%] rotate-4 rounded-t-2xl border border-zinc-700 shadow-soft shadow-[0_30px_80px_rgba(0,0,0,0.6)]" />
              <Image src="/images/tooarna-home.jpg" alt="" width={800} height={505} priority sizes="50vw"
                className="absolute top-0 left-1/4 w-1/2 rounded-t-2xl border border-zinc-600 shadow-soft shadow-[0_30px_80px_rgba(0,0,0,0.7)]" />
            </div>
          </div>
        </section>

        {/* FACTS */}
        <section className="facts border-b border-line">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 px-5 md:px-8 lg:grid-cols-4">
            {UI.facts.map((f, i) => (
              <div key={i} className={`py-8 pr-4 md:py-9 ${i % 2 === 1 ? "border-l border-line pl-5" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""} ${i > 0 ? "lg:pl-6" : ""}`}>
                <div className="text-4xl font-bold tracking-[-0.04em] tabular-nums md:text-[56px]" {...(/^\d+$/.test(f.v) ? { "data-count": f.v } : {})}>{/^\d+$/.test(f.v) ? "0" : f.v}</div>
                <div className="mt-1 text-[15px] text-zinc-400">{t(f.t)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <div aria-hidden="true" className="overflow-hidden border-b border-line py-6">
          <div className="mq gap-10 text-2xl font-semibold tracking-[-0.02em] whitespace-nowrap text-zinc-500 md:text-[30px]">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-10">
                {m}
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* WORK */}
        <section id="work" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-24 md:px-8 md:pt-32">
          <div data-reveal className="mb-14 flex flex-wrap items-end justify-between gap-4 md:mb-16">
            <h2 className="text-5xl leading-none font-bold tracking-[-0.04em] md:text-7xl">{t(UI.workTitle)}</h2>
            <span className="font-mono text-sm text-zinc-400">2025 — 2026</span>
          </div>

          <div className="flex flex-col gap-10 md:gap-16">
            {PROJECTS.map((p, idx) => (
              <article key={p.id} className="stack-card grid items-center gap-10 rounded-[32px] border border-line2 p-6 md:p-10 lg:grid-cols-12 lg:gap-12" style={{ "--a": p.accent, "--i": idx } as React.CSSProperties}>
                <div className={`flex flex-col gap-5 lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3.5 font-mono text-[13px] text-zinc-400">
                    <span className="font-bold acc" style={{ "--a": p.accent } as React.CSSProperties}>{p.n}</span>
                    <span className="h-px flex-1 bg-line2" />
                    <span>{t(p.kind)}</span>
                  </div>
                  <h3 className="text-[44px] leading-none font-bold tracking-[-0.035em] md:text-[52px]">{p.name}</h3>
                  <p className="text-lg leading-normal text-zinc-300 md:text-xl">{t(p.tagline)}</p>
                  <div className="tint flex flex-col gap-1.5 rounded-2xl border border-line bg-panel px-5 py-4">
                    <span className="font-mono text-xs font-bold acc" style={{ "--a": p.accent } as React.CSSProperties}>{t(UI.hard)}</span>
                    <span className="text-base leading-relaxed text-zinc-400">{t(p.hard)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => <Chip key={s}>{s}</Chip>)}
                  </div>
                  <div className="flex gap-2.5 pt-1">
                    {p.live && <Btn href={p.live} variant="light" external>{t(UI.live)} ↗</Btn>}
                    <Btn href={p.repo} external>{t(UI.code)} ↗</Btn>
                  </div>
                </div>

                <div data-tilt className={`frame tilt relative overflow-hidden rounded-[18px] border border-line2 bg-panel shadow-soft shadow-[0_40px_100px_rgba(0,0,0,0.55)] lg:col-span-7 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span aria-hidden="true" className="tilt-light" />
                  <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                    <span className="h-[11px] w-[11px] rounded-full bg-zinc-700" />
                    <span className="h-[11px] w-[11px] rounded-full bg-zinc-700" />
                    <span className="h-[11px] w-[11px] rounded-full bg-zinc-700" />
                    <span className="flex-1 truncate text-center font-mono text-xs text-zinc-400">{p.domain}</span>
                  </div>
                  <div className="cf">
                    {p.images.map((im) => (
                      <Image key={im.src} src={im.src} alt={t(im.alt)} fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover object-top" />
                    ))}
                  </div>
                  <div className="dots flex justify-center gap-1.5 border-t border-line py-3" aria-hidden="true"><i /><i /><i /></div>
                </div>
              </article>
            ))}
          </div>

          {/* MORE */}
          <div data-reveal className="mt-28 mb-10 flex flex-wrap items-end justify-between gap-4 md:mt-32">
            <h3 className="text-4xl leading-none font-bold tracking-[-0.035em] md:text-5xl">{t(UI.moreTitle)}</h3>
            <a href={`${PROFILE.github}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold hover:text-accent">
              {t(UI.allGithub)} ↗
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {MORE.map((m) => (
              <a key={m.n} href={m.repo ?? m.live} target="_blank" rel="noopener noreferrer"
                style={{ "--a": m.color } as React.CSSProperties}
                data-reveal className="more-card group flex flex-col gap-3.5 rounded-[20px] border border-line2 p-7 transition-colors hover:border-zinc-500 hover:bg-panel md:p-8">
                <span className="font-mono text-xs font-bold acc" style={{ "--a": m.color } as React.CSSProperties}>{m.n} · {t(m.label)}</span>
                <span className="flex items-start justify-between gap-4 text-[28px] font-bold tracking-[-0.02em]">
                  {t(m.name)}
                  <span className="text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white">↗</span>
                </span>
                <span className="text-[15px] leading-relaxed text-zinc-400">{t(m.desc)}</span>
                <span className="mt-auto pt-2 font-mono text-xs text-zinc-300">{m.stack}</span>
              </a>
            ))}
          </div>
          <a href={ARCHIVE.repo} target="_blank" rel="noopener noreferrer"
            className="mt-4 flex flex-wrap justify-between gap-3 rounded-2xl border border-dashed border-zinc-700 px-6 py-5 text-[15px] text-zinc-400 transition-colors hover:border-zinc-500">
            <span><span className="font-mono text-xs font-bold text-zinc-300">{ARCHIVE.n} · {t(ARCHIVE.label)}</span>&nbsp;&nbsp;{t(ARCHIVE.text)}</span>
            <span className="text-zinc-100">↗</span>
          </a>
        </section>

        {/* STACK */}
        <section id="stack" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-28 md:px-8 md:pt-36">
          <h2 data-reveal className="mb-12 text-5xl leading-none font-bold tracking-[-0.04em] md:text-7xl">{t(UI.stackTitle)}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map((g) => (
              <div key={g.title} data-reveal className="tint-soft flex flex-col gap-4 rounded-[18px] border border-line2 p-7" style={{ "--a": g.color } as React.CSSProperties}>
                <span className="font-mono text-[13px] font-bold acc" style={{ "--a": g.color } as React.CSSProperties}>{g.title}</span>
                <ul className="flex flex-col gap-1 text-lg leading-relaxed text-zinc-300 md:text-[19px]">
                  {g.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto grid max-w-[1280px] scroll-mt-20 gap-10 px-5 pt-28 md:px-8 md:pt-36 lg:grid-cols-12 lg:gap-14">
          <div data-reveal className="flex flex-col gap-8 lg:col-span-5">
            <h2 className="text-5xl leading-none font-bold tracking-[-0.04em] md:text-7xl">{t(UI.aboutTitle)}</h2>
            <div className="relative w-[220px] overflow-hidden rounded-3xl border border-line2 md:w-[260px]">
              <Image src={PROFILE.photo} alt={t(PROFILE.name)} width={600} height={800} sizes="260px" className="h-auto w-full" />
              <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 font-mono text-xs text-zinc-200 backdrop-blur">
                <span className="pulse h-1.5 w-1.5 rounded-full bg-green-400" />Junior Python / Fullstack
              </span>
            </div>
          </div>
          <div data-reveal className="flex flex-col gap-7 lg:col-span-7">
            <p className="text-xl leading-snug text-zinc-300 md:text-[26px] md:leading-[1.45]">{t(UI.aboutText)}</p>
            <dl className="flex flex-col border-t border-line2">
              {PROFILE.education[lang] && (
                <div className="grid gap-2 border-b border-line2 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="font-mono text-sm text-zinc-400">{PROFILE.educationYears || t(UI.aboutRows.edu)}</dt>
                  <dd className="text-[17px]">{PROFILE.education[lang]}</dd>
                </div>
              )}
              <div className="grid gap-2 border-b border-line2 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="font-mono text-sm text-zinc-400">2025 — 2026</dt>
                <dd className="text-[17px]">{t(UI.aboutRows.portfolio)}: {t(UI.aboutRows.portfolioText)}</dd>
              </div>
              <div className="grid gap-2 border-b border-line2 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="font-mono text-sm text-zinc-400">{t(UI.aboutRows.langs)}</dt>
                <dd className="text-[17px]">{t(UI.aboutRows.langsText)}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-28 md:px-8 md:pt-36">
          <div data-reveal className="contact-card dotgrid relative flex flex-col gap-9 overflow-hidden rounded-[28px] border border-line2 px-6 py-14 md:px-16 md:py-20">
            <span className="font-mono text-sm text-accent">{t(UI.contactKicker)}</span>
            <h2 className="text-5xl leading-[0.92] font-extrabold tracking-[-0.05em] md:text-[104px]">
              {t(UI.contactTitleA)}
              <br />
              {t(UI.contactTitleB)}
            </h2>
            {PROFILE.email && (
              <a href={`mailto:${PROFILE.email}`} className="self-start border-b-2 border-accent pb-1 text-2xl font-semibold tracking-[-0.02em] break-all hover:text-accent md:text-[32px]">
                {PROFILE.email} →
              </a>
            )}
            <div className="flex flex-wrap gap-2.5">
              {contacts.map((c) => <Btn key={c.href} href={c.href} external>{c.label}</Btn>)}
              {PROFILE.resume && <Btn href={PROFILE.resume} variant="accent">{t(UI.nav.resume)} (PDF) ↓</Btn>}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer relative mt-32 overflow-hidden">
        <div aria-hidden="true" className="footer-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1280px] px-5 pt-20 md:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="flex flex-col gap-5">
              <a href={`/${lang}`} className="flex items-center gap-3 font-mono text-lg font-bold">
                <span className="logo-badge flex h-11 w-11 items-center justify-center rounded-xl font-sans text-lg font-extrabold text-white">М</span>
                мирлан<span className="-ml-3 text-accent">.dev</span>
              </a>
              <p className="max-w-[320px] text-[15px] leading-relaxed text-zinc-400">{t(UI.footerBlurb)}</p>
              <span className="flex items-center gap-2.5 self-start rounded-full border border-line2 bg-panel px-3.5 py-2 font-mono text-xs text-zinc-300">
                <span className="pulse h-2 w-2 rounded-full bg-green-400" />
                {t(UI.status)}
              </span>
            </div>
            <div className="flex flex-col gap-3.5 text-[15px]">
              <span className="font-mono text-xs font-bold tracking-[0.14em] text-zinc-500 uppercase">{t(UI.footNav)}</span>
              {(["work", "stack", "about", "contact"] as const).map((k) => (
                <a key={k} href={`#${k}`} className="foot-link text-zinc-300 hover:text-zinc-100">{t(UI.nav[k])}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3.5 text-[15px]">
              <span className="font-mono text-xs font-bold tracking-[0.14em] text-zinc-500 uppercase">{t(UI.footProjects)}</span>
              {PROJECTS.map((p) => (
                <a key={p.id} href={p.live ?? p.repo} target="_blank" rel="noopener noreferrer" className="foot-link text-zinc-300 hover:text-zinc-100">{p.name} ↗</a>
              ))}
            </div>
            <div className="flex flex-col gap-3.5 text-[15px]">
              <span className="font-mono text-xs font-bold tracking-[0.14em] text-zinc-500 uppercase">{t(UI.footContact)}</span>
              {PROFILE.email && <a href={`mailto:${PROFILE.email}`} className="foot-link break-all text-zinc-300 hover:text-zinc-100">{PROFILE.email}</a>}
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="foot-link text-zinc-300 hover:text-zinc-100">GitHub ↗</a>
              <a href={PROFILE.instagram} target="_blank" rel="noopener noreferrer" className="foot-link text-zinc-300 hover:text-zinc-100">Instagram ↗</a>
              {PROFILE.resume && <a href={PROFILE.resume} className="foot-link text-zinc-300 hover:text-zinc-100" download>{t(UI.nav.resume)} (PDF) ↓</a>}
            </div>
          </div>

          <div aria-hidden="true" className="footer-word mt-16 text-center text-[19vw] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap select-none lg:text-[240px]">
            {t(UI.footerWord)}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 font-mono text-[13px] text-zinc-400">
            <span>© 2026 {t(PROFILE.name)} · {t(UI.footerMade)}</span>
            <a href="#top" className="flex items-center gap-2 rounded-xl border border-line2 px-4 py-2.5 font-sans text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-500">
              {t(UI.backTop)} <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
