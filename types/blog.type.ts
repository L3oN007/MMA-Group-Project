export interface IBlog {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  tags: string[];
  imageUrl: string;
  comments: IComment[];
}

export interface IComment {
  user: string;
  comment: string;
  createdAt: string;
}

