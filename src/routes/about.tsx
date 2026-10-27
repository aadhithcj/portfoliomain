import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { SiteHeader } from "@/components/SiteHeader";
import DecryptedText from "@/components/fx/DecryptedText";
import { PageBackdrop } from "@/components/fx/PageBackdrop";
import { HandNote } from "@/components/fx/HandNote";
import { AboutLanyard } from "@/components/fx/AboutLanyard";
import { profile } from "@/lib/portfolio";
import {
  portrait,
  contactSheet,
  preloadPhotographyImages,
} from "@/lib/about-media";

// Preload photography WebP images early as soon as the About chunk loads
preloadPhotographyImages();
import {
  ArrowUpRight,
  Film,
  Camera,
  Trophy,
  Compass,
  Instagram,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Aadhith C J" },
      {
        name: "description",
        content:
          "Background, current work, and personal profile of Aadhith C Joseph.",
      },
      { property: "og:title", content: "About - Aadhith C J" },
      {
        property: "og:description",
        content:
          "Full-stack engineering, web development, and beyond-code passions.",
      },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://aadhithcj.site/about" }],
  }),
  component: About,
});

const tags = [
  { label: "FULL-STACK", dot: "bg-[#FF7700]" },
  { label: "WEB DEV", dot: "bg-[#42BFDD]" },
  { label: "SOFTWARE ENGINEERING", dot: "bg-[#F1BE05]" },
  { label: "VISUAL STORYTELLING", dot: "bg-[#CE4760]" },
];

// Update these whenever they stop being true; the date stamp tells visitors how fresh it is
const nowUpdated = "Oct 2026";
const now = [
  {
    key: "building",
    color: "bg-[#F1BE05] text-black",
    value: "This portfolio, one page at a time.",
  },
  {
    key: "learning",
    color: "bg-[#42BFDD] text-black",
    value:
      "DevOps: CI/CD, Docker and AWS through DevOpsHub. Terraform and Prometheus are next.",
  },
  {
    key: "maintaining",
    color: "bg-[#FF7700] text-black",
    value:
      "The inventory and billing app a motor-parts shop runs on every day.",
  },
  {
    key: "looking for",
    color: "bg-[#22C55E] text-black",
    value: "Software engineering and full-stack roles.",
  },
];

const interests = [
  {
    tag: "MOTION",
    title: "Videography & motion graphics",
    icon: Film,
    note: "Rhythm-based edits and motion graphics. 50+ social media videos delivered.",
    accent: "#CE4760",
    ink: "text-white",
  },
  {
    tag: "35MM",
    title: "Street & architecture photography",
    icon: Camera,
    note: "Light, geometry and everyday street scenes, on digital and vintage glass.",
    accent: "#42BFDD",
    ink: "text-black",
  },
  {
    tag: "THE PITCH",
    title: "Football",
    icon: Trophy,
    note: "Playing weekly, and always happy to talk tactics.",
    accent: "#F1BE05",
    ink: "text-black",
  },
  {
    tag: "ON THE ROAD",
    title: "Road trips",
    icon: Compass,
    note: "Mountain highways, regional food, and trips planned the night before.",
    accent: "#FF7700",
    ink: "text-black",
  },
];

// Fine SVG noise, laid over photos for the same film grain the 3D card gets
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** The portrait in black and white with grain; falls back to a monogram if no photo is set. */
function BwPortrait({ className = "" }: { className?: string }) {
  if (!portrait) {
    return (
      <div
        role="img"
        aria-label={profile.name}
        className={`grid place-items-center bg-[#FF7700] font-badge text-[#2E2D34] ${className}`}
      >
        AC
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <img
        src={portrait.src}
        alt={portrait.alt}
        draggable={false}
        className="size-full object-cover object-[50%_30%] grayscale contrast-125"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply"
        style={{ backgroundImage: GRAIN }}
      />
    </div>
  );
}

/** Static, draggable ID card: the desktop fallback when WebGL is unavailable. */
function IdCard() {
  return (
    <motion.figure
      drag
      dragSnapToOrigin
      dragElastic={0.2}
      whileDrag={{ rotate: -2, scale: 1.04, cursor: "grabbing" }}
      initial={{ rotate: 4 }}
      className="relative w-52 shrink-0 cursor-grab select-none border-2 border-border bg-[#FFFDF7] text-[#2E2D34] shadow-[6px_6px_0px_0px_var(--shadow-color)]"
    >
      <div className="flex items-center justify-between border-b-2 border-border bg-[#F1BE05] px-2.5 py-1.5 text-black">
        <span className="font-badge text-xs">
          ACJ<span className="text-[#FF3C38]">_</span>
        </span>
        <span className="font-sora text-[10px] font-semibold">ID // 2026</span>
      </div>
      <BwPortrait className="m-3 aspect-[4/5] border-2 border-border shadow-[4px_4px_0px_0px_#2E2D34]" />
      <figcaption className="px-3 pb-2">
        <p className="font-badge text-base leading-tight">{profile.name}</p>
        <p className="mt-1 font-sora text-[11px] font-semibold">
          Full-stack engineer
        </p>
        <p className="font-sora text-[10px] text-[#605D68]">Kerala, India</p>
      </figcaption>
      <div className="flex items-center gap-1.5 border-t-2 border-border bg-[#22C55E] px-3 py-1.5 font-badge text-[11px] text-black">
        <span className="size-2 bg-black" aria-hidden="true" />
        OPEN TO WORK
      </div>
    </motion.figure>
  );
}

/** Compact ID shown on phones and tablets, where the hanging card is switched off. */
function IdStrip() {
  return (
    <div className="flex w-fit max-w-full -rotate-1 items-stretch border-2 border-border bg-[#FFFDF7] text-[#2E2D34] shadow-[4px_4px_0px_0px_var(--shadow-color)]">
      <BwPortrait className="w-20 shrink-0 border-r-2 border-border" />
      <div className="flex min-w-0 flex-col justify-center gap-0.5 px-3 py-2.5">
        <p className="font-badge text-sm leading-tight">{profile.name}</p>
        <p className="font-sora text-[11px] font-semibold">
          Full-stack engineer, Kerala
        </p>
        <p className="mt-1 flex w-fit items-center gap-1.5 border-2 border-border bg-[#22C55E] px-1.5 py-0.5 font-badge text-[10px] text-black">
          <span className="size-1.5 bg-black" aria-hidden="true" />
          OPEN TO WORK
        </p>
      </div>
    </div>
  );
}

function About() {
  const [accent, setAccent] = useState("#F1BE05");

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <PageBackdrop accent={accent} />
      <SiteHeader />
      <div className="relative">
        {/* Desktop: the 3D card hangs in its own full-width layer above the content, so
            it can be dragged anywhere in this band without clipping. Click-through. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden h-[760px] lg:block">
          <p className="sr-only">
            ID card for {profile.name}, full-stack engineer, open to work. Drag
            it around, or click it to flip it over for contact details.
          </p>
          <AboutLanyard
            portraitSrc={portrait?.src ?? null}
            fallback={
              <div className="pointer-events-auto absolute left-[73%] top-24 -translate-x-1/2">
                <IdCard />
              </div>
            }
          />
          <HandNote
            flip
            rotate={5}
            className="absolute left-[calc(73%+120px)] top-36 hidden w-36 [@media(min-width:1280px)_and_(any-pointer:fine)]:block"
          >
            drag it. click it.
          </HandNote>
        </div>

        <main className="page-enter relative z-10 mx-auto max-w-4xl px-5 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
          <div className="min-w-0">
            <p className="label-mono">
              <DecryptedText
                text="# README.md // PROFILE"
                speed={25}
                sequential
                animateOn="view"
                encryptedClassName="text-lime"
              />
            </p>

            <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl">
              Hi, I'm{" "}
              <em className="italic whitespace-nowrap text-lime font-normal">
                Aadhith CJ
              </em>
              .
            </h1>

            <p className="mt-5 max-w-xl lg:max-w-lg text-lg sm:text-xl leading-relaxed text-foreground/90 font-sans">
              Computer Science graduate from Kerala. I build full-stack
              applications, experiment with AI, and enjoy making the complicated
              stuff work.
            </p>

            <div className="mt-5 flex max-w-xl flex-wrap gap-2 lg:max-w-lg">
              {tags.map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider border-2 border-border shadow-[2px_2px_0px_0px_var(--shadow-color)] bg-card text-foreground"
                >
                  <span className={`size-1.5 ${tag.dot}`} />
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Wherever the hanging card is off (phones, tablets, touch screens), a compact ID strip stands in */}
            <div className="mt-6 [@media(min-width:1024px)_and_(any-pointer:fine)]:hidden">
              <IdStrip />
            </div>
          </div>

          {/* Now: what is true this month */}
          <section aria-labelledby="now-heading" className="mt-12 sm:mt-14">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="now-heading" className="label-mono">
                <DecryptedText
                  text="## now"
                  speed={25}
                  sequential
                  animateOn="view"
                  encryptedClassName="text-lime"
                />
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                updated {nowUpdated}
              </span>
            </div>

            <dl className="border-2 border-border bg-card shadow-[5px_5px_0px_0px_var(--shadow-color)]">
              {now.map((row) => (
                <div
                  key={row.key}
                  className="grid gap-2 border-b-2 border-border/30 px-4 py-3.5 last:border-b-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-5 sm:px-5"
                >
                  <dt>
                    <span
                      className={`inline-block border-2 border-border px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider ${row.color}`}
                    >
                      {row.key}
                    </span>
                  </dt>
                  <dd className="font-sans text-base leading-relaxed text-foreground">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Beyond code: a contact sheet, with the real work on Instagram */}
          <section aria-labelledby="beyond-heading" className="mt-12 sm:mt-14">
            <h2 id="beyond-heading" className="label-mono mb-4">
              <DecryptedText
                text="## beyond code // contact sheet"
                speed={25}
                sequential
                animateOn="view"
                encryptedClassName="text-lime"
              />
            </h2>

            <div
              className="border-2 border-border bg-[#2E2D34] px-3 py-5 shadow-[5px_5px_0px_0px_var(--shadow-color)] sm:px-4"
              style={{
                // Sprocket holes along the top and bottom edges of the strip
                backgroundImage:
                  "repeating-linear-gradient(90deg, #F7F0D9 0 8px, transparent 8px 22px), repeating-linear-gradient(90deg, #F7F0D9 0 8px, transparent 8px 22px)",
                backgroundSize: "100% 6px, 100% 6px",
                backgroundPosition: "11px 6px, 11px calc(100% - 6px)",
                backgroundRepeat: "no-repeat",
              }}
            >
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {contactSheet.map((shot, i) => (
                  <li key={shot.src} className="group">
                    <div className="relative aspect-square overflow-hidden border-2 border-[#F7F0D9] bg-black transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:rotate-1">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="eager"
                        decoding="async"
                        width={400}
                        height={400}
                        draggable={false}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ objectPosition: shot.focus ?? "50% 50%" }}
                      />
                    </div>
                    {/* Film edge print: frame number and a made-up stock name */}
                    <p className="mt-1.5 flex justify-between font-mono text-[9px] font-bold uppercase tracking-wider text-[#F1BE05]">
                      <span>▸ {String(i + 1).padStart(2, "0")}A</span>
                      <span>ACJ 400</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {interests.map((item) => (
                <li
                  key={item.tag}
                  className="flex gap-3"
                  onMouseEnter={() => setAccent(item.accent)}
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center border-2 border-border shadow-[2px_2px_0px_0px_var(--shadow-color)] ${item.ink}`}
                    style={{ background: item.accent }}
                    aria-hidden="true"
                  >
                    <item.icon className="size-4" strokeWidth={2.25} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative mt-7 flex flex-wrap items-center gap-4">
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                data-crosshair-target
                className="inline-flex items-center gap-2.5 border-2 border-border bg-[#CE4760] px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--shadow-color)] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                <Instagram className="size-4" aria-hidden="true" />
                {profile.instagramHandle}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <p className="font-hand text-xl text-muted-foreground">
                the edits and photos live here
              </p>
            </div>
          </section>

          {/* Closing call to action, with the resume and the rest of the site */}
          <div className="relative mt-12 sm:mt-14 border-2 border-border bg-card p-6 sm:p-8 shadow-[5px_5px_0px_0px_var(--shadow-color)]">
            <HandNote
              flip
              rotate={6}
              className="hidden sm:block absolute -top-14 right-6 w-40"
            >
              your move
            </HandNote>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              Got a role or a project in mind?
            </h2>
            <p className="mt-2 max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
              I'm looking for software engineering and full-stack work. The
              resume has the short version.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                data-crosshair-target
                className="inline-flex items-center gap-2 border-2 border-border bg-[#F1BE05] px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--shadow-color)] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                Get in touch <span aria-hidden="true">→</span>
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-crosshair-target
                className="inline-flex items-center gap-2 border-2 border-border bg-card px-5 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-foreground shadow-[4px_4px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_var(--shadow-color)] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
              >
                Resume (PDF){" "}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-6 border-t-2 border-dashed border-border/50 pt-4 font-mono text-xs text-muted-foreground">
              Or keep browsing:{" "}
              {[
                { to: "/projects", label: "projects" },
                { to: "/skills", label: "skills" },
                { to: "/log", label: "the log" },
              ].map((l, i) => (
                <span key={l.to}>
                  {i > 0 && ", "}
                  <Link
                    to={l.to}
                    data-crosshair-target
                    className="font-bold text-foreground underline decoration-2 underline-offset-4 decoration-[#F1BE05] hover:bg-[#F1BE05] hover:text-black"
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
