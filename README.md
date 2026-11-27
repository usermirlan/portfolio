# мирлан.dev — портфолио

Мирлан А. — fullstack developer. Портфолио сайты: Next.js 16, React 19, Tailwind 4, үч тил (KY / RU / EN).

## Иштетүү

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Мазмунду өзгөртүү

Бардык тексттер жана маалыматтар `lib/content.ts` файлында:

- `PROFILE` — аты, email, Telegram, LinkedIn, резюме, билим. Бош калган талаалар сайтта көрсөтүлбөйт.
- `PROJECTS` — негизги долбоорлор (скриншоттор `public/images/` папкасында).
- `MORE` — кошумча долбоорлор.

Резюме кошуу: PDF файлды `public/resume.pdf` деп салып, `PROFILE.resume = "/resume.pdf"` деп жазыңыз.

## Деплой

Vercel'ге GitHub репосун импорттоо жетиштүү, эч кандай жөндөө керек эмес.
