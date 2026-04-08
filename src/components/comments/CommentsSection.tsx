"use client";

import { Column, Heading, Row } from "@once-ui-system/core";
import { CommentCount } from "./CommentCount";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { useComments } from "./CommentsProvider";
import type { CommentEntityType } from "./types";
import styles from "./CommentsSection.module.scss";

interface CommentsSectionProps {
  entityType: CommentEntityType;
  slug: string;
}

export function CommentsSection({ entityType, slug }: CommentsSectionProps) {
  const { comments, addComment } = useComments(entityType, slug);

  return (
    <Column className={styles.section} gap="16">
      <Row fillWidth horizontal="space-between" vertical="center" gap="8">
        <Heading as="h2" variant="heading-strong-m">
          Comments
        </Heading>
        <CommentCount entityType={entityType} slug={slug} variant="body-default-s" />
      </Row>
      <CommentForm onSubmit={addComment} />
      <CommentList comments={comments} />
    </Column>
  );
}
