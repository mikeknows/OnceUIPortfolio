"use client";

import { Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import type { CommentRecord } from "./types";
import styles from "./CommentsSection.module.scss";

export function CommentList({ comments }: { comments: CommentRecord[] }) {
  if (comments.length === 0) {
    return (
      <Text variant="body-default-s" onBackground="neutral-weak" marginTop="16">
        No comments yet.
      </Text>
    );
  }

  return (
    <div className={styles.list}>
      {comments.map((comment) => (
        <article key={comment.id} className={styles.item}>
          <div className={styles.meta}>
            <Text as="h3" variant="body-strong-s">
              {comment.name}
            </Text>
            <Text variant="label-default-s" onBackground="neutral-weak">
              {formatDate(comment.createdAt, false)}
            </Text>
          </div>
          <Text variant="body-default-s" onBackground="neutral-strong" marginTop="8">
            {comment.text}
          </Text>
        </article>
      ))}
    </div>
  );
}
