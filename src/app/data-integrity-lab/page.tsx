import { Meta, Schema } from "@once-ui-system/core";
import { DataIntegrityLab } from "@/features/data-integrity-lab/DataIntegrityLab";
import { about, baseURL, person } from "@/resources";

const title = `Data Integrity Lab – ${person.name}`;
const description =
  "An interactive, product-neutral engineering demo for validating, normalizing, matching, and safely routing synthetic records.";

export async function generateMetadata() {
  return Meta.generate({
    title,
    description,
    baseURL,
    image: "/images/projects/data-integrity-lab.svg",
    path: "/data-integrity-lab",
  });
}

export default function DataIntegrityLabPage() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/data-integrity-lab"
        title={title}
        description={description}
        image={`${baseURL}/images/projects/data-integrity-lab.svg`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <DataIntegrityLab />
    </>
  );
}
