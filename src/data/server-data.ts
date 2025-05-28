// Video server options

interface ServerOption {
  baseUrl: string;
  extraParams: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const serverUrlOption: ServerOption[] = JSON.parse(SERVER_URL);
