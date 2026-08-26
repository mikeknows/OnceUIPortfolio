export type ShowcaseProject = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  image?: string;
  visual?: "image" | "automation";
  href: string;
  accent: "cyan" | "emerald" | "violet" | "amber";
  photographer?: string;
  photoUrl?: string;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "data-integrity-lab",
    eyebrow: "FEATURED · INTERACTIVE ENGINEERING LAB",
    title: "Data Integrity Lab",
    summary:
      "A working, product-neutral demo that normalizes synthetic records, identifies duplicate risk, and explains deterministic import decisions.",
    image: "/images/projects/data-integrity-lab.svg",
    href: "/data-integrity-lab",
    accent: "emerald",
  },
  {
    slug: "dynamic-sql-grid",
    eyebrow: "INTERACTIVE ENGINEERING DEMO",
    title: "Dynamic SQL Grid",
    summary:
      "Parses a sample SQL schema and maps it into an editable React table so the implementation can be explored directly.",
    image: "/images/projects/dynamic-sql-grid.svg",
    href: "/work/dynamic-sql-grid",
    accent: "cyan",
  },
  {
    slug: "secure-cicd",
    eyebrow: "PROFESSIONAL PATTERN · SANITIZED",
    title: "CI/CD Security Pipeline",
    summary:
      "Explains how automated builds and Fortify static analysis move security feedback earlier in a repeatable release process.",
    image: "/images/gallery/cloud-infrastructure.jpg",
    href: "/work/secure-delivery-fortify",
    accent: "emerald",
    photographer: "Tyler",
    photoUrl: "https://unsplash.com/photos/eqd0f78u9nI",
  },
  {
    slug: "api-architecture",
    eyebrow: "ENGINEERING GUIDE · PRODUCT-NEUTRAL",
    title: "Secure API Communication",
    summary:
      "Walks through authenticated request flows, DTO boundaries, validation, and failure-aware client contracts.",
    image: "/images/gallery/engineering-workspace.jpg",
    href: "/work/understanding-apis",
    accent: "violet",
    photographer: "James Harrison",
    photoUrl: "https://unsplash.com/photos/vpOeXr5wmR4",
  },
  {
    slug: "steamprint",
    eyebrow: "INDEPENDENT PRODUCT · LIVE",
    title: "Steamprint",
    summary:
      "Turns a public PC game library into configurable Markdown—with privacy checks, layered caching, rate limits, and secure server-side API handling.",
    image: "/images/showcase/steamprint.jpg",
    href: "/hobby-projects#steamprint",
    accent: "violet",
    photographer: "Joshua Kettle",
    photoUrl: "https://unsplash.com/photos/mHm1ASYNC0I",
  },
  {
    slug: "steamos-tv-automation",
    eyebrow: "LINUX · HOME AUTOMATION",
    title: "SteamOS × TV Power",
    summary:
      "Coordinates suspend, network readiness, Samsung TV power, SmartThings recovery, retries, and diagnostics as one dependable workflow.",
    visual: "automation",
    href: "/hobby-projects#tv-automation",
    accent: "cyan",
  },
];

export const hobbyProjects = showcaseProjects.filter((project) =>
  ["steamprint", "steamos-tv-automation"].includes(project.slug),
);
