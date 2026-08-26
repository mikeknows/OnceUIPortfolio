"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { showcaseProjects } from "@/resources/showcase";
import styles from "./ProjectShowcase.module.scss";

const shuffle = <T,>(items: T[]) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
};

export function ProjectShowcase() {
  const [projects, setProjects] = useState(showcaseProjects);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const projectRailRef = useRef<HTMLDivElement>(null);
  const projectButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const [featured, ...secondary] = showcaseProjects;
    setProjects([featured, ...shuffle(secondary)]);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const move = useCallback(
    (direction: number) => {
      setActiveIndex((current) => (current + direction + projects.length) % projects.length);
    },
    [projects.length],
  );

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setTimeout(() => move(1), 9000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, move, prefersReducedMotion]);

  useEffect(() => {
    const rail = projectRailRef.current;
    const activeButton = projectButtonRefs.current[activeIndex];
    if (!rail || !activeButton || rail.scrollWidth <= rail.clientWidth) return;

    const targetLeft = activeButton.offsetLeft - (rail.clientWidth - activeButton.offsetWidth) / 2;
    rail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex, prefersReducedMotion]);

  const visibleProjects = useMemo(() => {
    const previous = (activeIndex - 1 + projects.length) % projects.length;
    const next = (activeIndex + 1) % projects.length;
    return [
      { project: projects[previous], position: "previous" },
      { project: projects[activeIndex], position: "active" },
      { project: projects[next], position: "next" },
    ];
  }, [activeIndex, projects]);

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div
        className={styles.stage}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("a, button, input, select, textarea")) return;
          dragStartX.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (dragStartX.current === null) return;
          const distance = event.clientX - dragStartX.current;
          dragStartX.current = null;
          if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
        }}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        {visibleProjects.map(({ project, position }) => (
          <article
            key={`${project.slug}-${position}`}
            className={`${styles.card} ${styles[position]}`}
            data-accent={project.accent}
            aria-hidden={position !== "active"}
          >
            {project.visual === "automation" ? (
              <div className={styles.automationGraphic} aria-hidden="true">
                <div className={styles.automationGlow} />
                <div className={styles.automationMesh}>
                  <span>SteamOS</span>
                  <i />
                  <span>systemd</span>
                  <i />
                  <span>Network</span>
                  <i />
                  <span>SmartThings</span>
                </div>
              </div>
            ) : project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                priority={position === "active"}
                sizes={position === "active" ? "(max-width: 720px) 94vw, 920px" : "36vw"}
                className={`${styles.image} ${project.image.endsWith(".svg") ? styles.diagramImage : ""}`}
              />
            ) : null}
            <div className={styles.scrim} />
            {position === "active" && (
              <>
                {project.photoUrl && project.photographer && (
                  <a className={styles.credit} href={project.photoUrl} target="_blank" rel="noreferrer">
                    Photo: {project.photographer} / Unsplash
                  </a>
                )}
                <div className={styles.content}>
                  <span className={styles.eyebrow}>{project.eyebrow}</span>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>
                  <Link href={project.href} className={styles.link}>
                    Explore project <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </>
            )}
          </article>
        ))}
      </div>

      <div className={styles.navigator}>
        <div className={styles.navigatorRow}>
          <div ref={projectRailRef} className={styles.projectRail} role="group" aria-label="Choose a project">
            {projects.map((project, index) => (
              <button
                type="button"
                ref={(element) => {
                  projectButtonRefs.current[index] = element;
                }}
                key={project.slug}
                aria-label={`Show ${project.title}`}
                aria-current={index === activeIndex}
                className={index === activeIndex ? styles.activeProject : styles.projectButton}
                onClick={() => setActiveIndex(index)}
              >
                <span className={styles.projectIndex}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.projectLabel}>{project.title}</span>
                {index === activeIndex && (
                  <span
                    key={`${activeIndex}-${isPaused}`}
                    className={styles.progress}
                    style={{ animationPlayState: isPaused ? "paused" : "running" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
