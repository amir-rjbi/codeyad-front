import { IApiResponse } from "~~/models/IApiResponse";
import { RoadMap, RoadMapPageData } from "./../models/roadMap/roadMap";
export const GetRoadMapData = (): Promise<IApiResponse<RoadMapPageData>> => {
  return FetchApi("/roadmap");
};
export const GetRoadMapBySlug = (
  slug: string
): Promise<IApiResponse<RoadMap>> => {
  return FetchApi("/roadmap/" + slug);
};
