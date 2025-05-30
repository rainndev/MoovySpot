// Video server options

export interface ServerOption {
  movieLink: string;
  tvLink: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const serverUrlOption: ServerOption[] = JSON.parse(SERVER_URL);
