"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Fade, Flex, Line, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, hobby, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname() ?? "";
  const workSelected = pathname.startsWith("/work") || pathname === "/data-integrity-lab";

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade hide s={{ hide: false }} fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        <Flex paddingLeft="24" fillWidth vertical="center" textVariant="body-default-s" s={{ hide: true }}>
          <Link className={styles.identity} href="/" aria-label="Michael Plymire, home">
            <span className={styles.monogram}>MP</span>
            <span className={styles.identityCopy}>
              <strong>Michael Plymire</strong>
              <small>Software Engineer</small>
            </span>
          </Link>
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton
                  className={styles.mobileHome}
                  aria-label="Home"
                  prefixIcon="home"
                  href="/"
                  selected={pathname === "/"}
                />
              )}
              <Line
                className={styles.mobileHomeDivider}
                background="neutral-alpha-medium"
                vert
                maxHeight="24"
              />
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className={styles.desktopNavItem}
                    prefixIcon="grid"
                    href="/work"
                    label={work.label}
                    selected={workSelected}
                  />
                  <ToggleButton
                    className={styles.mobileNavItem}
                    prefixIcon="grid"
                    href="/work"
                    aria-label="Work"
                    selected={workSelected}
                  />
                </>
              )}
              {routes["/about"] && (
                <>
                  <ToggleButton
                    className={styles.desktopNavItem}
                    prefixIcon="person"
                    href="/about"
                    aria-label="About"
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className={styles.mobileNavItem}
                    prefixIcon="person"
                    href="/about"
                    aria-label="About"
                    selected={pathname === "/about"}
                  />
                </>
              )}
              {routes["/hobby-projects"] && (
                <>
                  <ToggleButton
                    className={styles.desktopNavItem}
                    prefixIcon="hobby"
                    href="/hobby-projects"
                    aria-label="Lab"
                    label={hobby.label}
                    selected={pathname.startsWith("/hobby-projects")}
                  />
                  <ToggleButton
                    className={styles.mobileNavItem}
                    prefixIcon="hobby"
                    href="/hobby-projects"
                    aria-label="Lab"
                    selected={pathname.startsWith("/hobby-projects")}
                  />
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <ToggleButton
                    className={styles.desktopNavItem}
                    prefixIcon="gallery"
                    href="/gallery"
                    aria-label="Gallery"
                    label={gallery.label}
                    selected={pathname === "/gallery"}
                  />
                  <ToggleButton
                    className={styles.mobileNavItem}
                    prefixIcon="gallery"
                    href="/gallery"
                    aria-label="Gallery"
                    selected={pathname === "/gallery"}
                  />
                </>
              )}
              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className={styles.desktopNavItem}
                    prefixIcon="book"
                    href="/blog"
                    aria-label="Writing"
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className={styles.mobileNavItem}
                    prefixIcon="book"
                    href="/blog"
                    aria-label="Writing"
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal="end" vertical="center" paddingRight="12" s={{ hide: true }}>
          <a className={styles.contact} href={`mailto:${person.email}`}>
            Let&apos;s talk
          </a>
        </Flex>
      </Flex>
    </>
  );
};
