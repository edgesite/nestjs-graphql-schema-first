import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Movie, MovieCast, MovieDetail } from '@/generated/graphql';

const movies = [
  {
    id: 114514,
    type: 'movie',
    title: '真夏の夜の淫夢',
    cast: [
      { actor: 810, chara: 'Yaju Senpai' }
    ],
    recommends: [1919],
  },
  {
    id: 1919,
    type: 'movie',
    title: '真夏の夜の淫夢 SP',
    cast: [
      { actor: 810, chara: 'Yaju Senpai' }
    ],
    recommends: [114514],
  },
];

const actors = [
  {
    id: 810,
    name: 'Tadokoro Koji',
    character: 'Yaju Senpai',
  },
];

@Resolver('MovieDetail')
export class MovieDetailResolver {
  @Query(() => MovieDetail)
  async movieDetail(
    @Args('id') id: number,
  ): Promise<MovieDetail> {
    const movie = movies.find(m => m.id === id);
    if (!movie) return null;
    return {
      movie,
    };
  }

  @ResolveField()
  async recommends(
    @Parent() parent: MovieDetail,
  ): Promise<Movie[]> {
    const ids = movies.find(m => m.id === parent.movie.id)?.recommends;
    return ids && movies.filter(m => ids.includes(m.id));
  }

  @ResolveField()
  async cast(
    @Parent() parent: MovieDetail,
  ): Promise<MovieCast[]> {
    const movie = movies.find(m => m.id === parent.movie.id);
    if (!movie) return null;
    return movie.cast.map(c => ({
      id: c.actor,
      name: actors.find(a => a.id === c.actor).name,
      character: c.chara,
      parent, // for dedupe moreMovies
    }));
  }
}

@Resolver('MovieCast')
export class MovieCastResolver {
  @ResolveField()
  async moreMovies(
    @Parent() parent: MovieCast & { parent?: MovieDetail },
  ): Promise<Movie[]> {
    const allMovies = movies.filter(m => m.cast.some(c => c.actor === parent.id));
    if (parent.parent) {
      return allMovies.filter(m => m.id !== parent.parent.movie.id);
    }
    return allMovies;
  }
}
