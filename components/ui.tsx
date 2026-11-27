import type { ReactNode } from "react";

export function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "accent" | "light" | "ghost"; external?: boolean; className?: string };

export function Btn({ href, children, variant = "ghost", external, className = "" }: BtnProps) {
  const base = "inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const v = {
    accent: "bg-accent text-ink font-bold hover:brightness-110",
    light: "bg-zinc-100 text-ink font-bold hover:opacity-90",
    ghost: "border border-zinc-700 text-zinc-100 hover:border-zinc-400 hover-tint",
  }[variant];
  return (
    <a href={href} className={`${base} ${v} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-lg border border-line2 px-2.5 py-1.5 font-mono text-xs text-zinc-300">{children}</span>;
}
