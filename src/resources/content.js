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
        company: "TriYoung",
        timeframe: "06/2021 - 06/2025",
        role: "Software Support Specialist → Software Developer → Lead Software Developer",
        achievements: [
          <>
            <strong>Promoted to Lead Software Developer (03/2023):</strong> Designed and maintained external CAREWare applications, including token-based login workflows and automated record posting processes.
          </>,
          <>
            Developed automated eligibility systems across multiple jurisdictions and CAREWare import programs aligned with PDI schemas.
          </>,
          <>
            Built dynamic SQL reporting tools, service and budgeting applications, and automated CAREWare uptime monitoring solutions.
          </>,
          <>
            Automated build and security pipelines, maintained the VB.NET codebase, and designed secure deployment processes for Eligibility and Import applications.
          </>,
          <>
            Mentored a junior developer through code reviews and pair programming to strengthen code quality and consistency.
          </>,
          <>
            <strong>Promoted to Software Developer (10/2021):</strong> Built ASPX applications in the .NET Framework and developed and maintained integrations with the CAREWare database and API.
          </>,
          <>
            Established GitHub repositories, build and release pipelines, and staging and production workflows to improve delivery and code quality.
          </>,
          <>
            Deployed and managed virtual machines, SQL databases, functions, app services, AWS resources, and IIS environments.
          </>,
          <>
            <strong>Joined as Software Support Specialist (06/2021):</strong> Resolved end-user software and help desk issues, delivered remote client training, and maintained clear technical documentation.
          </>,
          <>
            Tested and implemented new features, developed test plans, and supported server and database configurations.
          </>,
          <>
            Supported CAREWare reporting, custom fields and subforms, permissions, services, labs, screenings, and RSR/ADR workflows.
          </>,
        ],
        images: [],
      },
      {
        company: "Woolpert — Geospatial Sector",
        timeframe: "01/2021 - 06/2021",
        role: "Application Support Specialist",
        achievements: [
          <>
            Developed specialized Microsoft SQL Server queries for data gathering and analysis across multiple environments.
          </>,
          <>
            Troubleshot cloud download and upload synchronization through several VPN clients and resolved customer application issues.
          </>,
          <>
            Supported geospatial applications across multiple database layers.
          </>,
        ],
        images: [],
      },
      {
        company: "R&L Carriers — Information Management Team",
        timeframe: "07/2020 - 01/2021",
        role: "Service Desk Analyst",
        achievements: [
          <>
            Coordinated with teams including Telecommunications to deliver cross-department projects.
          </>,
          <>
            Trained Service Desk Analysts in ITIL ServicePro issue management and advanced Microsoft Office and Windows troubleshooting.
          </>,
          <>
            Supported Cisco Finesse and Jabber, Active Directory, Group Policy, LDAP, VPN tools, and critical system and network monitoring.
          </>,
        ],
        images: [],
      },
      {
        company: "Wright State University — CATS",
        timeframe: "09/2016 - 07/2020",
        role: "Senior IT Service Desk → Project Manager",
        achievements: [
          <>
            Managed high-level VIP incidents and requests and delegated work to assistant representatives.
          </>,
          <>
            Trained student service desk staff in ITIL and Salesforce and resolved Active Directory and campus system issues.
          </>,
          <>
            Performed hardware, software, and peripheral repairs and maintained installation and replacement documentation.
          </>,
          <>
            <strong>Expanded into Project Management (01/2019):</strong> Led a Computer Science student programming team developing in-house applications for university use.
          </>,
          <>
            Mentored students during lectures and office hours and taught version control and project contribution practices.
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
