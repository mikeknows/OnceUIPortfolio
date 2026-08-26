const person = {
  firstName: "Michael",
  lastName: "Plymire",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer · Healthcare Systems & Automation",
  avatar: "/images/personal/michael-plymire-headshot.jpg",
  email: "michael.plymire@gmail.com",
  location: "America/Chicago",
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}’s Newsletter</>,
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
  image: "/images/og/michael-plymire-engineering.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Software engineer with 10 years across IT and software delivery, including 5 years building healthcare software.`,
  headline: <>I build reliable software for complex, high-stakes workflows.</>,
  featured: {
    display: true,
    title: <><strong>10 years</strong><span className="ml-4"> across IT and software delivery</span></>,
    href: "/about",
  },
  subline: (
    <>
      Five years building healthcare software shaped how I work: protect the data, understand the
      workflow, and leave the system easier to operate than I found it.
      <br /> I work across C#, .NET, SQL Server, React, APIs, automation, and secure delivery.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I started in hands-on IT support and grew into leading software development. That path gave
        me a practical view of engineering: understand the user, trace the system, fix the root cause,
        and leave the software easier to operate than I found it.
        <br /><br />
        Over 10 years, I’ve worked across support, infrastructure, databases, application development,
        and technical leadership—including 5 years building healthcare software. Outside work, I build
        tools around games, Linux, connected devices, and home automation.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Current Role",
        timeframe: "07/2025 - Present",
        role: "Software Engineer",
        achievements: [
          <>
            Employer, product, responsibilities, and implementation details are intentionally omitted from this public portfolio.
          </>,
        ],
        images: [],
      },
      {
        company: "TriYoung",
        timeframe: "06/2021 - 06/2025",
        role: "Promoted twice: Support → Developer → Lead Developer",
        phases: [
          {
            role: "Lead Software Developer",
            timeframe: "03/2023 - 06/2025",
            achievements: [
              <>Designed and maintained external CAREWare applications, including token-based login workflows and automated record posting processes.</>,
              <>Developed automated eligibility systems across multiple jurisdictions and CAREWare import programs aligned with PDI schemas.</>,
              <>Built dynamic SQL reporting tools, service and budgeting applications, and automated CAREWare uptime monitoring solutions.</>,
              <>Automated build and security pipelines, maintained the VB.NET codebase, and designed secure deployment processes for eligibility and import applications.</>,
              <>Mentored a junior developer through code reviews and pair programming.</>,
            ],
          },
          {
            role: "Software Developer",
            timeframe: "10/2021 - 02/2023",
            achievements: [
              <>Built ASPX applications in the .NET Framework and developed and maintained integrations with the CAREWare database and API.</>,
              <>Established GitHub repositories, build and release pipelines, and staging and production workflows to improve delivery and code quality.</>,
              <>Deployed and managed virtual machines, SQL databases, functions, app services, AWS resources, and IIS environments.</>,
            ],
          },
          {
            role: "Software Support Specialist",
            timeframe: "06/2021 - 09/2021",
            achievements: [
              <>Resolved end-user software and help desk issues, delivered remote client training, and maintained clear technical documentation.</>,
              <>Tested and implemented new features, developed test plans, and supported server and database configurations.</>,
              <>Supported CAREWare reporting, custom fields and subforms, permissions, services, labs, screenings, and RSR/ADR workflows.</>,
            ],
          },
        ],
        achievements: [],
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
        role: "Senior IT Service Desk Representative",
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
            <strong>Concurrent Student Project Manager (01/2019 - 07/2020):</strong> Led a Computer Science student programming team developing in-house applications for university use.
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
        name: "B.A. Computer Science · Wright State University",
        description: <>Graduated in 2020 after combining formal CS study with four years of campus IT work.</>,
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
        title: "C# & .NET",
        description: <>Building maintainable web applications, REST APIs, service integrations, and background workflows across modern and legacy .NET systems.</>,
        images: [],
      },
      {
        title: "SQL Server & Data Systems",
        description: <>Designing reporting, import, validation, and data-grid workflows with careful attention to data quality and operability.</>,
        images: [],
      },
      {
        title: "React & Product Interfaces",
        description: <>Turning complex workflows into clear, responsive interfaces with React, Next.js, TypeScript, and accessible interaction patterns.</>,
        images: [],
      },
      {
        title: "Secure Delivery & Technical Leadership",
        description: <>Automating builds and releases, integrating static analysis, documenting systems, reviewing code, and mentoring developers.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Writing",
  title: `Engineering Notes – ${person.name}`,
  description: `Practical writing on data systems, application security, APIs, and software delivery by ${person.name}`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Engineering Work – ${person.name}`,
  description: `Product-neutral case studies and interactive engineering demonstrations by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const hobby = {
  path: "/hobby-projects",
  label: "Lab",
  title: `Hobby Projects – ${person.name}`,
  description: `Independent products and experiments across gaming, Linux, and home automation by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Beyond the Desk – ${person.name}`,
  description: `A personal gallery of travel, nature, and life beyond software by ${person.name}`,
  images: [
    {
      src: "/images/gallery/personal/london-tower-bridge.jpg",
      alt: "Tower Bridge illuminated over the Thames beneath a deep blue evening sky",
      location: "LONDON",
      title: "Tower Bridge After Dark",
      caption: "Blue hour, city lights, and one of those views that earns the long walk.",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/personal/dog-in-the-sun.jpg",
      alt: "Michael's smiling brown and white dog sitting in sunlit grass",
      location: "HOME",
      title: "The Best Coworker",
      caption: "Always available for a walk, a snack, or a perfectly timed interruption.",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/personal/rome-vatican-museum.jpg",
      alt: "Classical marble sculpture framed by patterned stone inside the Vatican Museums",
      location: "ROME",
      title: "Marble and Myth",
      caption: "A quiet moment with the scale and detail of the Vatican Museums.",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/personal/london-big-ben.jpg",
      alt: "Elizabeth Tower rising against a vivid blue London sky",
      location: "LONDON",
      title: "A London Classic",
      caption: "Elizabeth Tower framed by summer light and an impossibly clear sky.",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/personal/rome-trevi-fountain.jpg",
      alt: "Sculpted stone figures and water at the Trevi Fountain in Rome",
      location: "ROME",
      title: "Trevi in the Details",
      caption: "Up close, the fountain feels less like a landmark and more like a living sculpture.",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/personal/romania-bear.jpg",
      alt: "A brown bear resting at the edge of a forest road in Romania",
      location: "ROMANIA",
      title: "Unexpected Company",
      caption: "One unforgettable roadside encounter in the Carpathians.",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/personal/romania-waterfall.jpg",
      alt: "A forest waterfall spilling over stone in Romania",
      location: "ROMANIA",
      title: "Off the Main Road",
      caption: "Cold water, dense green, and a worthwhile detour.",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/personal/romania-palace-detail.jpg",
      alt: "An ornate glass chandelier viewed from below inside a Romanian palace",
      location: "ROMANIA",
      title: "Looking Up",
      caption: "A ceiling detail where engineering, craft, and spectacle all meet.",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, hobby, gallery };
