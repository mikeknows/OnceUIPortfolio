import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  return (
    <Column maxWidth="l" fillWidth gap="xl" paddingY="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="m" gap="12" paddingX="16">
        <Text variant="label-strong-s" onBackground="brand-strong">
          BEYOND THE DESK
        </Text>
        <Heading as="h1" variant="display-strong-l" wrap="balance">
          Life beyond the terminal.
        </Heading>
        <Text variant="heading-default-l" onBackground="neutral-weak" wrap="balance">
          A few frames from home and the road—good company, old cities, unexpected wildlife, and
          the details that made me stop and look twice.
        </Text>
      </Column>
      <MasonryGrid />
    </Column>
  );
}
