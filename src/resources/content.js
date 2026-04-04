import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Michael",
  lastName: "Plymire",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.svg",
  email: "michael.plymire@gmail.com",
  location: "America/New_York", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about software engineering, technology trends, and share insights on 
      building scalable applications and innovative solutions.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/mikeknows",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/michaelplymire/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>I build reliable web apps that keep your data safe</>,
  featured: {
    display: true,
    title: <>Featured project: <strong className="ml-4">Dynamic SQL Grid</strong></>,
    href: "/work/dynamic-sql-grid",
  },
  subline: (
    <>
      I build complete products, from the user-facing website to the systems that run behind the scenes.
      <br /> Lately, I've helped teams release updates faster while protecting customer data and reducing risk.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a software engineer who spends most of my time in C#, SQL Server, and React.
        I've worked on API integrations, dynamic data grids, and CI/CD pipelines with Fortify security checks.
        I like practical engineering: clean code, clear docs, and systems that are easy to maintain.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Enterprise Product Team",
        timeframe: "2023 - Present",
        role: "Software Engineer",
        achievements: [
          <>
            Built and maintained C# APIs used by internal and client-facing apps, with a focus on auth, reliability, and clear contracts.
          </>,
          <>
            Implemented GitHub Actions CI/CD with Fortify scans so security issues are caught before deployment.
          </>,
          <>
            Shipped dynamic SQL-driven grid features that reduced custom UI work for new data views.
          </>,
        ],
        images: [],
      },
      {
        company: "Earlier Roles",
        timeframe: "Before 2023",
        role: "Full Stack Developer",
        achievements: [
          <>
            Delivered web features end-to-end across frontend, backend, and database layers.
          </>,
          <>
            Improved query performance and simplified API responses to make UI development faster.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Computer Science",
        description: <>Formal CS training plus hands-on backend and database work.</>,
      },
      {
        name: "Continuous Learning",
        description: <>I keep sharpening C#, SQL optimization, and secure delivery practices.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "C# APIs",
        description: <>Designing REST endpoints, auth flows, and DTO contracts that are easy for frontend teams to consume.</>,
        images: [],
      },
      {
        title: "SQL & Data Grids",
        description: <>Building dynamic SQL-backed interfaces with sorting, filtering, and performance tuning for large datasets.</>,
        images: [],
      },
      {
        title: "CI/CD & App Security",
        description: <>Automating builds and releases in GitHub Actions with Fortify scanning and policy-based quality gates.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about software engineering and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Software engineering projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
