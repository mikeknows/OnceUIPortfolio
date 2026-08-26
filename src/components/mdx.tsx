import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import React from "react";
import { DynamicSqlSandbox } from "@/components/work/DynamicSqlSandbox";

import { 
  Heading,
  HeadingLink,
  Text,
  InlineCode,
  CodeBlock,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
} from "@once-ui-system/core";

function CustomLink({ href = "", children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt = "", src }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string" || !src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      aspectRatio="16 / 9"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
    />
  );
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const slug = slugify(String(children));
    return (
      <HeadingLink
        marginTop="24"
        marginBottom="12"
        as={as}
        id={slug}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;

  return CustomHeading;
}

function createParagraph({ children }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: React.HTMLAttributes<HTMLElement>) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  // For pre tags that contain code blocks
  if (
    React.isValidElement<React.HTMLAttributes<HTMLElement>>(props.children) &&
    typeof props.children.props.className === "string"
  ) {
    const { className, children } = props.children.props;
    
    // Extract language from className (format: language-xxx)
    const language = className.replace('language-', '');
    const label = language.charAt(0).toUpperCase() + language.slice(1);
    const code = typeof children === "string" ? children : String(children ?? "");
    
    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code,
            language,
            label
          }
        ]}
        copyButton={true}
      />
    );
  }
  
  // Fallback for other pre tags or empty code blocks
  return <pre {...props} />;
}

const components: MDXComponents = {
  p: createParagraph,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: createImage,
  a: CustomLink,
  code: createInlineCode,
  pre: createCodeBlock,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  DynamicSqlSandbox,
};

type CustomMDXProps = Omit<MDXRemoteProps, "components"> & {
  components?: MDXComponents;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}
