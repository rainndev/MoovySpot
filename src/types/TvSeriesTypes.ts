export type SeasonInfo = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

type GuestStar = {
  // Define this further based on structure
  [key: string]: any;
};

type CrewMember = {
  // Define this further based on structure
  [key: string]: any;
};

export type Episode = {
  air_date: string;
  crew: CrewMember[];
  episode_number: number;
  episode_type: string;
  guest_stars: GuestStar[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};
