import { IApiResponse } from "./../models/IApiResponse";
import { SearchFilterResult } from "./../models/SearchFilterResult";
export const SearchAll = (
  searchText: string
): Promise<IApiResponse<SearchFilterResult>> => {
  return FetchApi("/home/search", {
    query: {
      search: searchText,
    },
  });
};
