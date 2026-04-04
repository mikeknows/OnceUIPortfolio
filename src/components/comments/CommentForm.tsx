"use client";

import { Button, Text } from "@once-ui-system/core";
import { FormEvent, useState } from "react";
import styles from "./CommentsSection.module.scss";

export function CommentForm({ onSubmit }: { onSubmit: (input: { name: string; text: string }) => void }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();

    if (!trimmedName || !trimmedText) return;

    onSubmit({ name: trimmedName, text: trimmedText });
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="comment-name">
          <Text variant="label-default-s">Name</Text>
        </label>
        <input
          id="comment-name"
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="comment-text">
          <Text variant="label-default-s">Comment</Text>
        </label>
        <textarea
          id="comment-text"
          className={styles.textarea}
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
      </div>

      <Button type="submit" size="m" style={{ width: "fit-content" }}>
        Submit
      </Button>
    </form>
  );
}
