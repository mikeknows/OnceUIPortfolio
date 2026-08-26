import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column gap="12" paddingX="l" paddingTop="32">
        <Text variant="label-strong-s" onBackground="brand-strong">
          ENGINEERING WORK
        </Text>
        <Heading as="h1" variant="display-strong-l" wrap="balance">
          Real engineering patterns, explained without exposing private systems.
        </Heading>
        <Text variant="heading-default-l" onBackground="neutral-weak" wrap="balance">
          These case studies use original, product-neutral examples and synthetic data. They contain
          no employer source code, interfaces, internal architecture, or customer information.
        </Text>
      </Column>
      <Projects />
    </Column>
  );
}
