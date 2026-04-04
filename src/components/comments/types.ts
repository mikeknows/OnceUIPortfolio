export type CommentEntityType = "blog" | "work";

export type CommentRecord = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
};
