// Video server options

export interface ServerOption {
  movieLink: string;
  tvLink: string;
}

export const serverUrlOption: ServerOption[] = [
  {
    movieLink: "https://111movies.com/movie/##id##",
    tvLink: "https://111movies.com/tv/##id##/##season##/##episode##",
  },
  {
    movieLink:
      "https://vidjoy.pro/embed/movie/##id##?adFree=true&autoplay=true",
    tvLink:
      "https://vidjoy.pro/embed/tv/##id##/##season##/##episode##?adFree=true&autoplay=true",
  },
  {
    movieLink: "https://player.vidsrc.co/embed/movie/##id##",
    tvLink: "https://player.vidsrc.co/embed/tv/##id##/##season##/##episode##",
  },
  {
    movieLink: "https://vidfast.pro/movie/##id##",
    tvLink: "https://vidfast.pro/tv/##id##/##season##/##episode##",
  },
  {
    movieLink: "https://player.videasy.net/movie/##id##?progress=120",
    tvLink:
      "https://player.videasy.net/tv/##id##/##season##/##episode##?progress=120",
  },
  {
    movieLink: "https://vidsrc.cc/v2/embed/movie/##id##",
    tvLink: "https://vidsrc.cc/v2/embed/tv/##id##/##season##/##episode##",
  },
  {
    movieLink: "https://vidora.su/movie/##id##?autoplay=true",
    tvLink: "https://vidora.su/tv/##id##/##season##/##episode##?autoplay=true",
  },
];
