let developmentUrl: string = "https://api.codeyad.com";
let productionUrl: string = "https://api.codeyad.com";
export const isProd = process.env.NODE_ENV === "production";
export const CurrentDomainUrl = isProd
  ? "https://test.codeyad.com"
  : "http://localhost:3000";

export const BASE_URL: string = isProd ? productionUrl : developmentUrl;
