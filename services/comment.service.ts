import { FilterResult } from "./../models/IApiResponse";
import { IApiResponse } from "~~/models/IApiResponse";
import { CommentType, Comment } from "./../models/comments/Comment";
export const GetComments = (
  linkId: number,
  commentType: CommentType,
  pageId: number,
  take: number
): Promise<IApiResponse<FilterResult<Comment>>> => {
  return FetchApi("/comment", {
    query: {
      linkId,
      commentType,
      pageId,
      take,
    },
  });
};
export const CreateComment = (
  text: string,
  linkId: number,
  type: CommentType,
  parentId: number = 0
) => {
  return FetchApi("/comment", {
    method: "POST",
    body: {
      text,
      linkId,
      type,
      parentId,
    },
  });
};
export const DeleteComment = (id: number) => {
  return FetchApi("/comment?commentId=" + id, {
    method: "DELETE",
  });
};
