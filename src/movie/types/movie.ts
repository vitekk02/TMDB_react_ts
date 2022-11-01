import { StringMappingType } from "typescript"

export interface Movie{
    id: number,
    poster_path: string | null,
    adult: boolean,
    overview: string,
    release_date: string
    genre_ids: Array<number>,
    original_title: string,
    original_language: string,
    title: string,
    backdrop_path: string | null,
    popularity: number,
    vote_count: number,
    vote_average: number,
    video: boolean,
    rating: number
}