"use client";

import { Text } from "@once-ui-system/core";
import { useEffect, useState } from "react";
import styles from "./CommentCount.module.scss";
import { formatCommentCount, useComments } from "./CommentsProvider";
import type { CommentEntityType } from "./types";

interface CommentCountProps {
  entityType: CommentEntityType;
  slug: string;
  variant?: "body-default-s" | "label-default-s";
}

export function CommentCount({ entityType, slug, variant = "label-default-s" }: CommentCountProps) {
  const { count } = useComments(entityType, slug);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    const timeoutId = window.setTimeout(() => setAnimated(false), 180);
    return () => window.clearTimeout(timeoutId);
  }, [count]);

  return (
    <Text
      variant={variant}
      onBackground="neutral-weak"
      className={`${styles.count} ${animated ? styles.bump : ""}`}
      aria-live="polite"
    >
      {formatCommentCount(count)}
    </Text>
  );
}
