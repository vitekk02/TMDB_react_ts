import { Review } from "./review";

export interface ReviewList {
  id: number;
  page: number;
  results: Array<Review>;
  total_pages: number;
  total_results: number;
}