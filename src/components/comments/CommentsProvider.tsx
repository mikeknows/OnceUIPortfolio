"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CommentEntityType, CommentRecord } from "./types";

type CommentsMap = Record<string, CommentRecord[]>;

type CommentsContextValue = {
  getComments: (entityType: CommentEntityType, slug: string) => CommentRecord[];
  addComment: (entityType: CommentEntityType, slug: string, input: { name: string; text: string }) => void;
};

const CommentsContext = createContext<CommentsContextValue | null>(null);
const STORAGE_KEY = "onceui-comments";

const getCommentKey = (entityType: CommentEntityType, slug: string) => `${entityType}:${slug}`;

export function CommentsProvider({ children }: { children: React.ReactNode }) {
  const [commentsByItem, setCommentsByItem] = useState<CommentsMap>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CommentsMap;
      setCommentsByItem(parsed);
    } catch {
      setCommentsByItem({});
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(commentsByItem));
  }, [commentsByItem]);

  const getComments = useCallback(
    (entityType: CommentEntityType, slug: string) => commentsByItem[getCommentKey(entityType, slug)] || [],
    [commentsByItem],
  );

  const addComment = useCallback(
    (entityType: CommentEntityType, slug: string, input: { name: string; text: string }) => {
      const key = getCommentKey(entityType, slug);
      const newComment: CommentRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: input.name.trim(),
        text: input.text.trim(),
        createdAt: new Date().toISOString(),
      };

      setCommentsByItem((current) => ({
        ...current,
        [key]: [...(current[key] || []), newComment],
      }));
    },
    [],
  );

  const value = useMemo(() => ({ getComments, addComment }), [addComment, getComments]);

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
}

export function useComments(entityType: CommentEntityType, slug: string) {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error("useComments must be used inside CommentsProvider");
  }

  const comments = context.getComments(entityType, slug);

  return {
    comments,
    count: comments.length,
    addComment: (input: { name: string; text: string }) => context.addComment(entityType, slug, input),
  };
}

export function formatCommentCount(count: number) {
  return `${count} ${count === 1 ? "comment" : "comments"}`;
}
