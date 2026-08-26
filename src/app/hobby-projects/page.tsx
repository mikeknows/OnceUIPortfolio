import Image from "next/image";
import Link from "next/link";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { about, baseURL, hobby, person } from "@/resources";
import styles from "./page.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: hobby.title,
    description: hobby.description,
    baseURL,
    image: "/images/personal/gaming-handhelds.jpg",
    path: hobby.path,
  });
}

const automationProjects = [
  {
    index: "01",
    title: "Peak-hour climate control",
    description:
      "Adjusts thermostat set points during utility peak windows while preserving manual control.",
    detail: "Comfort · Energy awareness · Overrides",
    image: "/images/personal/smart-thermostat.jpg",
  },
  {
    index: "02",
    title: "Motorized blinds",
    description:
      "Coordinates blind routines around daylight, privacy, and the way a room is actually used.",
    detail: "Daylight · Privacy · Scheduling",
  },
  {
    index: "03",
    title: "Closet door lighting",
    description:
      "Uses door state to turn lighting on immediately when opened and off again when closed.",
    detail: "Sensors · State · Instant feedback",
  },
  {
    index: "04",
    title: "Ambient night scenes",
    description:
      "Activates low-level lighting after dark without flooding the room with full brightness.",
    detail: "Time · Context · Human comfort",
  },
];

export default function HobbyProjectsPage() {
  return (
    <Column maxWidth="l" fillWidth gap="xl" paddingY="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={hobby.path}
        title={hobby.title}
        description={hobby.description}
        image={`${baseURL}/images/personal/gaming-handhelds.jpg`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column maxWidth="m" gap="12" paddingX="16">
        <Text variant="label-strong-s" onBackground="brand-strong">
          THE PERSONAL LAB
        </Text>
        <Heading as="h1" variant="display-strong-l" wrap="balance">
          Software is how I think—even off the clock.
        </Heading>
        <Text variant="heading-default-l" onBackground="neutral-weak" wrap="balance">
          I build tools for games, connect devices that were never designed to cooperate, and
          automate small friction points around my home.
        </Text>
      </Column>

      <article id="steamprint" className={styles.feature}>
        <div className={styles.visual}>
          <Image
            src="/images/personal/gaming-handhelds.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1100px"
            className={styles.visualBackdrop}
          />
          <Image
            src="/images/personal/gaming-handhelds.jpg"
            alt="Michael's collection of handheld gaming systems"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1100px"
            className={styles.visualImage}
          />
          <div className={styles.visualScrim} />
          <div className={styles.titleBlock}>
            <span>INDEPENDENT WEB APP</span>
            <h2>Steamprint</h2>
            <p>Your game library, structured for better recommendations.</p>
          </div>
        </div>

        <div className={styles.details}>
          <div>
            <span className={styles.kicker}>THE IDEA</span>
            <p>
              Steamprint turns a public Steam library into configurable Markdown for AI-assisted
              recommendations, backlog planning, playtime analysis, and manual completion tracking.
            </p>
          </div>
          <div>
            <span className={styles.kicker}>THE ENGINEERING</span>
            <ul>
              <li>Next.js, React, TypeScript, Tailwind CSS, and Vercel Analytics</li>
              <li>Server-only API key handling with strict input and response validation</li>
              <li>Layered caching, request coalescing, burst spacing, and rate-limit cooldowns</li>
              <li>Privacy-aware exports with Markdown injection safeguards</li>
            </ul>
          </div>
          <div className={styles.actions}>
            <Link
              href="https://steamprint.vercel.app"
              className={styles.primaryAction}
              target="_blank"
              rel="noreferrer"
            >
              Open live app ↗
            </Link>
            <span className={styles.privateSource}>Source is private</span>
          </div>
        </div>
      </article>

      <section id="tv-automation" className={styles.systemFeature}>
        <div className={styles.systemCopy}>
          <span className={styles.kicker}>LINUX · HOME AUTOMATION</span>
          <h2>SteamOS × Samsung TV power orchestration</h2>
          <p>
            I built a Linux automation layer that coordinates suspend and resume with a Samsung TV.
            It powers the display down before sleep, restores it through SmartThings after resume,
            preserves Wake-on-LAN behavior, and makes failures observable instead of mysterious.
          </p>
          <div className={styles.tags} aria-label="Technologies">
            {['systemd', 'NetworkManager', 'SmartThings', 'Wake-on-LAN', 'Shell'].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className={styles.privateNote}>
            The repository stays private; this overview omits device identifiers, network details,
            secrets, and household configuration.
          </p>
        </div>

        <div className={styles.systemVisual} aria-label="Three-stage TV power automation workflow">
          <div className={styles.terminalBar}>
            <span /><span /><span />
            <code>power-orchestrator.service</code>
          </div>
          <div className={styles.workflow}>
            <div className={styles.workflowStep}>
              <b>01</b>
              <div>
                <small>BEFORE SLEEP</small>
                <strong>Power down cleanly</strong>
                <p>Send the local TV command and preserve the wired interface for wake.</p>
              </div>
            </div>
            <div className={styles.workflowLine} aria-hidden="true" />
            <div className={styles.workflowStep}>
              <b>02</b>
              <div>
                <small>AFTER RESUME</small>
                <strong>Wait for the network</strong>
                <p>Coordinate with system and network readiness instead of racing startup.</p>
              </div>
            </div>
            <div className={styles.workflowLine} aria-hidden="true" />
            <div className={styles.workflowStep}>
              <b>03</b>
              <div>
                <small>RECOVERY</small>
                <strong>Retry and explain</strong>
                <p>Wake through SmartThings, retry failures, and expose useful diagnostics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.automationLab}>
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>HOME AUTOMATION LAB</span>
          <h2>Small systems that make a home feel more responsive.</h2>
          <p>
            The interesting part is not turning something on. It is modeling timing, overrides,
            device state, failure recovery, and the people who still need to use the room normally.
          </p>
        </div>
        <div className={styles.automationGrid}>
          {automationProjects.map((project) => (
            <article className={styles.automationCard} key={project.title}>
              {project.image && (
                <div className={styles.automationImage}>
                  <Image src={project.image} alt="A smart thermostat used in Michael's home automation lab" fill sizes="320px" />
                </div>
              )}
              <span className={styles.cardIndex}>{project.index}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>{project.detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workbench}>
        <div className={styles.workbenchImage}>
          <Image
            src="/images/personal/galaxy-office.jpg"
            alt="Michael's galaxy-themed home office with a standing desk and space-inspired artwork"
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
          <span>THE GALAXY LAB · MY ACTUAL HOME OFFICE</span>
        </div>
      </section>
    </Column>
  );
}
