import { CourseFaq } from "./Course";
export interface VideoPlayerData {
  title: string;
  imageName: string;
  courseToken: string;
  demo: string;
  descriptions: string;
  shortLink: string;
  requirements: string[];
  faqs: CourseFaq[];
  sections: PlayerSection[];
  id: number;
  episodeCount: number;
}
interface PlayerSection {
  title: string;
  episodeCount: number;
  episodes: PlayerEpisode[];
  seenAll: boolean;
}
export interface PlayerEpisode {
  id: number;
  title: string;
  token: string;
  duration: string;
  isSeen: boolean;
  haveAttachment: boolean;
  description: string;
}
