import { Movie } from "./movie";

export interface TopRatedMovies{
    page: number;
    results: Array<Movie>,
    total_results: number,
    total_pages: number
}