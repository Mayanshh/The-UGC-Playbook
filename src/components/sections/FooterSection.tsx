"use client";

import { Reveal } from "@/components/ui/Reveal";
import { FOOTER, type FooterContent } from "@/data/footer";
import { cn } from "@/lib/cn";

interface FooterSectionProps {
  content?: FooterContent;
  className?: string;
}

export function FooterSection({
  content = FOOTER,
  className,
}: FooterSectionProps) {
  const {
    brandName,
    tagline,
    navHeading,
    navLinks,
    sectionsHeading,
    sectionLinks,
    contactHeading,
    contactEmail,
    contactNote,
    copyright,
    legalNote,
  } = content;

  return (
    <footer
    id="footer"
      aria-label="Site footer"
      className={cn(
        "relative w-full overflow-hidden border-t border-dashed border-ink/15 bg-coco text-ink lg:border-solid lg:border-ink/10",
        className
      )}
    >
      <div className="mx-auto w-full max-w-380 px-4 pt-14 pb-10 md:px-12 md:pt-20 lg:px-16 lg:pt-24 lg:pb-12 xl:px-24">
        <Reveal y={14}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Brand & Statement */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-umber" />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-umber">
                  Colophon
                </span>
              </div>

              <p className="mt-4 font-serif text-3xl font-bold tracking-tight text-ink md:text-4xl lg:font-normal">
                {brandName}
              </p>

              <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-ink/70 md:text-[15px] lg:leading-[1.7]">
                {tagline}
              </p>
            </div>

            {/* Navigation Columns & Contact */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
              <div>
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
                  {navHeading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 font-sans text-sm text-ink/80 transition-colors duration-200 hover:text-ink"
                      >
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
                  {sectionsHeading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {sectionLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 font-sans text-sm text-ink/80 transition-colors duration-200 hover:text-ink"
                      >
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">
                  {contactHeading}
                </h2>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-4 block font-serif text-lg text-ink underline decoration-ink/25 underline-offset-4 transition-colors duration-200 hover:decoration-umber"
                >
                  {contactEmail}
                </a>
                <p className="mt-2 font-sans text-xs leading-relaxed text-ink/60">
                  {contactNote}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Hairline Bar */}
          <div className="mt-12 flex flex-col gap-3 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16 lg:pt-8">
            <p className="font-sans text-xs text-ink/60">{copyright}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
              {legalNote}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}