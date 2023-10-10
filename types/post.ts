export type PostType = {
  id: number;
  name: string;
  date: string;
  desc: string;
  vote: number;
  comment: CommentType[];
};

export type CommentType = {
  name: string;
  comment: string;
};
