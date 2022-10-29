
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum MovieType {
    SERIES = "SERIES",
    MOVIE = "MOVIE"
}

export abstract class IQuery {
    abstract movieDetail(id: number): Nullable<MovieDetail> | Promise<Nullable<MovieDetail>>;

    abstract movie(id: number): Nullable<Movie> | Promise<Nullable<Movie>>;
}

export class MovieDetail {
    movie?: Nullable<Movie>;
    recommends?: Nullable<Nullable<Movie>[]>;
    cast?: Nullable<Nullable<MovieCast>[]>;
}

export class MovieCast {
    name?: Nullable<string>;
    character?: Nullable<string>;
    movies?: Nullable<Nullable<Movie>[]>;
    episodes?: Nullable<Nullable<Episode>[]>;
}

export class Movie {
    id: number;
    type: string;
    title: string;
    descr?: Nullable<string>;
    image?: Nullable<string>;
    tags: Nullable<string>[];
    metadata?: Nullable<JSON>;
}

export class Episode {
    id: number;
    index: number;
    title: string;
    image?: Nullable<string>;
    duration?: Nullable<number>;
}

export type JSON = any;
type Nullable<T> = T | null;
