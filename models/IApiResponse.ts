import { ApiStatusCodes } from "./ApiStatusCodes";

export interface IApiResponse<T> {
  isSuccess: boolean;
  data: T | undefined;
  metaData: ResponseMetaData;
}
export interface ResponseMetaData {
  message: string;
  appStatusCode: ApiStatusCodes;
}
export interface FilterResult<T> extends BaseFilterResult {
  data: T[] | undefined;
}
export interface BaseFilterResult {
  entityCount: number;
  currentPage: number;
  pageCount: number;
  startPage: number;
  endPage: number;
  take: number;
}
export interface FilterParams {
  pageId: number;
  take: number;
}

export enum SearchOnType{
  deleted,
  active,
  all
}