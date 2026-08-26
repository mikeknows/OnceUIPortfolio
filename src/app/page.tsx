import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Schema } from "@once-ui-system/core";
import { home, about, person, baseURL, routes, work, hobby } from "@/resources";
import { Posts } from "@/components/blog/Posts";
import { ProjectShowcase } from "@/components/showcase/ProjectShowcase";
import styles from "./page.module.scss";

const proofPoints = [
  { value: "10 years", label: "IT & software delivery" },
  { value: "5 years", label: "Healthcare software" },
  { value: "Support → Lead", label: "Promotion-led growth" },
  { value: "C# · .NET · SQL", label: "Core engineering stack" },
];

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m" horizontal="center">
        <Column maxWidth="m" fillWidth>
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="8">
            <Text variant="label-strong-s" onBackground="brand-strong" className={styles.eyebrow}>
              SOFTWARE ENGINEER · HEALTHCARE · AUTOMATION
            </Text>
          </RevealFx>
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.3} fillWidth paddingBottom="32">
            <div className={styles.proofStrip}>
              {proofPoints.map((point) => (
                <div className={styles.proofPoint} key={point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="start">
            <Flex className={styles.heroActions} gap="12" wrap>
              <Button
                className={styles.heroAction}
                href={work.path}
                variant="primary"
                size="m"
                weight="strong"
                arrowIcon
              >
                View engineering work
              </Button>
            <Button
              className={styles.heroAction}
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Flex gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.label}
              </Flex>
            </Button>
              <Button
                className={styles.heroAction}
                href={`mailto:${person.email}`}
                variant="secondary"
                size="m"
                weight="default"
                prefixIcon="email"
              >
                Contact me
              </Button>
            </Flex>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx fillWidth translateY="16" delay={0.6}>
        <ProjectShowcase />
      </RevealFx>
      <RevealFx fillWidth translateY="12">
        <Column className={styles.afterHours} gap="16">
          <Text variant="label-strong-s" onBackground="brand-strong">
            ENGINEERING AFTER HOURS
          </Text>
          <Heading as="h2" variant="display-strong-s" wrap="balance">
            Games, Linux, connected devices, and the joy of making systems cooperate.
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            Steamprint, SteamOS power orchestration, and practical home automation show how I
            experiment when the problem is mine to define.
          </Text>
          <Button href={hobby.path} variant="secondary" size="m" arrowIcon>
            Explore the lab
          </Button>
        </Column>
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" s={{ direction: "column" }}>
          <Flex flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
    </Column>
  );
}
