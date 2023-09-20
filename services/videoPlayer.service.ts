import { VideoPlayerData } from "./../models/courses/VideoPlayer";
import { IApiResponse } from "./../models/IApiResponse";
export const GetCourseForPlayer = (
  courseId: number
): Promise<IApiResponse<VideoPlayerData>> => {
  return FetchApi("/videoPlayer/course/" + courseId);
};
export const GetVideoAttachmentFile = (
  courseId: number,
  episodeToken: string
):Promise<IApiResponse<string>> => {
  return FetchApi("/videoPlayer/DownloadAttachment", {
    query: {
      episodeToken,
      courseId,
    },
  });
};
export const SeenVideo = (courseId: number, episodeId: number) => {
  return FetchApi(`/videoPlayer`, {
    method: "POST",
    query: {
      courseId,
      episodeId,
    },
  });
};
