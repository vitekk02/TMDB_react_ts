import { Author } from "../../user/types/author";

export interface Review{
  author: string,
  author_details: Author,
  content: string,
  created_at: string,
  id: string,
  updated_at: string,
  url: string
}