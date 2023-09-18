let developmentUrl: string = "https://api.codeyad.com/api";
let productionUrl: string = "https://api.codeyad.com/api";
export const isProd = process.env.NODE_ENV === "production";
export const CurrentDomainUrl = isProd
  ? "https://test.codeyad.com"
  : "http://localhost:3000";
export const DL_DOMAIN_URL = "https://dl.codeyad.com";
export const BASE_URL: string = isProd ? productionUrl : developmentUrl;
