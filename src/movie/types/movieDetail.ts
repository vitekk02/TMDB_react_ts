import { ProductionCompanies, ProductionCountries } from "../../production";
import { Movie } from "./movie";

export interface MovieDetail extends Movie{
    budget: number,
    homepage: string | null,
    production_companies: ProductionCompanies,
    production_countries: ProductionCountries,
    revenue: number,
    runtime: number | null,
    status: string,
    tagline: string | null,
    
}